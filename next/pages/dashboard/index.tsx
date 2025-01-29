import DashboardLayout from "./DashboardLayout";
import { useMessageFlow } from "../../app/hooks/useMessageFlow";
import { GetStaticProps } from "next";
import Chart from "./Charts";
import { useEffect, useState } from "react";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/players`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const playerData = await response.json();
    console.log("playerData:", playerData);

    return {
      props: {
        playerData,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        playerData: [],
      },
    };
  }
};

interface PointsPerSeason {
  [playerName: string]: number[];
}

interface AvgPointsPerGame {
  [playerName: string]: number;
}

interface PlayerPerformance {
  [playerName: string]: number[];
}

interface PlayerPositionDistribution {
  [position: string]: number;
}

interface PlayerData {
  points_per_season: PointsPerSeason;
  avg_points_per_game: AvgPointsPerGame;
  player_performance: PlayerPerformance;
  player_position_distribution: PlayerPositionDistribution;
}

const DashboardPage = ({ playerData }: { playerData: PlayerData }) => {
  const [chartData, setChartData] = useState<any>(null);

  const theDashboard = {
    text: "Great, you made it to the Dashboard, this is where the fun starts.",
    delay: 5000,
  };

  const switchTheme = {
    text: "You can click on me to change the theme of the Dashboard.",
    delay: 4000,
  };

  useMessageFlow([
    {
      text: theDashboard.text,
      position: [2, 5],
      delayTime: theDashboard.delay,
      chatBubblePostion: { x: -100, y: -100 },
    },
    {
      text: switchTheme.text,
      position: [2, 5],
      delayTime: switchTheme.delay,
      clearAfterDelay: true,
      shouldTriggerIdle: true,
      chatBubblePostion: { x: -100, y: -100 },
    },
  ]);

  const colors = [
    "rgba(255,99,132,1)",
    "rgba(54,162,235,1)",
    "rgba(255,206,86,1)",
    "rgba(75,192,192,1)",
    "rgba(153,102,255,1)",
    "rgba(255,159,64,1)",
    "rgba(199,199,199,1)",
  ];
  useEffect(() => {
    if (playerData) {
      const pointsPerSeasonData = {
        labels: Object.keys(playerData.points_per_season),
        datasets: Object.keys(playerData.points_per_season).map(
          (playerName, index) => ({
            label: playerName,
            data: playerData.points_per_season[playerName],
            fill: false,
            borderColor: colors[index % colors.length],
            tension: 0.1,
          })
        ),
      };

      const avgPointsPerGameData = {
        labels: Object.keys(playerData.avg_points_per_game),
        datasets: [
          {
            label: "Avg Points Per Game",
            data: Object.values(playerData.avg_points_per_game),
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      const playerPerformanceData = {
        labels: Object.keys(playerData.player_performance),
        datasets: [
          {
            label: "Avg Points Per Game",
            data: Object.values(playerData.player_performance),
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      };

      const playerPerformanceOptions = {
        plugins: {
          legend: {
            position: "right",
            labels: {
              font: {
                size: 12,
              },
            },
          },
        },
      };

      const playerPositionDistributionData = {
        labels: Object.keys(playerData.player_position_distribution),
        datasets: [
          {
            data: Object.values(playerData.player_position_distribution),
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#FF9F40",
            ],
          },
        ],
      };

      setChartData({
        pointsPerSeasonData,
        avgPointsPerGameData,
        playerPerformanceData,
        playerPerformanceOptions,
        playerPositionDistributionData,
      });
    }
  }, [playerData]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-lg font-semibold text-white">Dashboard Home</h1>
        <p className="text-white mt-2 mb-5">Welcome to the dashboard!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Points per Season */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-gray-800 text-base font-medium mb-4">
              Points per Season
            </h2>
            <Chart data={chartData.pointsPerSeasonData} type="line" />
          </div>

          {/* Average Points Per Game */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-gray-800 text-base font-medium mb-4">
              Average Points Per Game
            </h2>
            <Chart data={chartData.avgPointsPerGameData} type="bar" />
          </div>

          {/* Player Position Distribution */}
          <div className="bg-white shadow-md rounded-lg p-4 h-80 flex-col">
            <h2 className="text-gray-800 text-base font-medium mb-0">
              Player Position Distribution
            </h2>
            <div className="m-auto w-fit h-fit">
              <Chart
                data={chartData.playerPositionDistributionData}
                options={chartData.playerPerformanceOptions}
                type="pie"
              />
            </div>
          </div>

          {/* Player Performance */}
          <div className="bg-white shadow-md rounded-lg p-4 h-80">
            <h2 className="text-gray-800 text-base font-medium mb-4">
              Player Performance
            </h2>
            <Chart data={chartData.playerPerformanceData} type="bar" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;

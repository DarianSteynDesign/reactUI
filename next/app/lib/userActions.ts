'use server'

export async function createUser(values: SignUpFormValues) {
  const { name, surname, email, password } = values;

  const response = await fetch('http://localhost:5000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, surname, email, password }),
  });

  if (!response.ok) {
    throw new Error('Signup failed');
  }

  return response.json();
}


export async function incrementLike(postId: string) {
  const response = await fetch('http://localhost:5000/api/like', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId })
  });

  if (!response.ok) {
    throw new Error('Failed to increment like');
  }

  const updatedPost = await response.json();
  return updatedPost;
}


export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would be hashed
  image?: string;
}

export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // This would be hashed in a real application
    image: "/images/users/john.jpg"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123", // This would be hashed in a real application
    image: "/images/users/jane.jpg"
  }
];

// Mock authentication functions
export const authenticate = (email: string, password: string): User | null => {
  const user = users.find(user => user.email === email && user.password === password);
  return user || null;
};

// Mock signup function
export const createUser = (email: string, password: string, name: string): User => {
  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Create new user
  const newUser: User = {
    id: (users.length + 1).toString(),
    name,
    email,
    password, // In a real app, this would be hashed
  };
  
  // Add to users array (in a real app, this would be saved to a database)
  users.push(newUser);
  
  return newUser;
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

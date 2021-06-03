interface MessageResponse {
  message: string;
}

export async function getMessageFromApi(): Promise<string> {
  const response = await fetch('http://localhost:5000/api/message');
  const data: MessageResponse = await response.json();
  return data.message;
}

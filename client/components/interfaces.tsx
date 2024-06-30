
export interface Message {
    id: string;          // Unique identifier for the message
    content: string;     // Content of the message (text)
    senderId: string;    // ID of the sender (assuming it corresponds to a profile ID)
    timestamp: Date;     // Timestamp when the message was sent
  }

  export interface Profile {
    id: string;
    name: string;
    age: string;
    bio: string;
    image: string;
  }
// /app/controller/dataFetch.js

// -------------------------------
// getChatCompletion
// -------------------------------
// Purpose:
// - Sends a user's chat history to the backend API to generate a chat completion
// - Useful for AI-driven conversation or question-answering
// Input:
// - chatHistory: Array of objects representing the conversation history [{role, parts}, ...]
// Output:
// - Returns an object containing `data` (response from API) and `status` (HTTP status code)
// Side Effects:
// - Calls the /api/create-chat-completion endpoint
// - Handles errors by logging to console
export const getChatCompletion = async (chatHistory) => {
  // Prepare request options for POST
  const options = {
    method: "POST",
    body: JSON.stringify({
      chatHistory, // Send entire chat history to backend
    }),
    headers: {
      "Content-Type": "application/json", // Ensure backend interprets body as JSON
    },
  };

  try {
    // Perform the fetch request to backend API
    const res = await fetch("/api/create-chat-completion", options);
    // Parse JSON response
    const data = await res.json();
    // Return both response data and HTTP status
    return { data, status: res.status };
  } catch (error) {
    // Log any network or parsing errors for debugging
    console.error(error);
  }
};

// -------------------------------
// getTranscription
// -------------------------------
// Purpose:
// - Converts an audio file to text by sending it to the speech-to-text API
// Input:
// - mediablockUrl: string URL pointing to the audio file to transcribe
// Output:
// - Returns an object containing `data` (transcribed text and metadata) and `status` (HTTP status code)
// Side Effects:
// - Fetches the audio file, converts it to a Blob, sends it via FormData to API
// - Handles errors by logging to console
export const getTranscription = async (mediablockUrl) => {
  // Fetch audio file from the provided URL and convert to Blob
  let file = await fetch(mediablockUrl).then((r) => r.blob());

  // Create FormData object for sending file as multipart/form-data
  const formData = new FormData();
  formData.append("file", file); // Append audio file under "file" key

  const options = {
    method: "POST",
    body: formData, // Send audio file in request body
  };

  try {
    // Perform POST request to speech-to-text API
    const res = await fetch("/api/speech-to-text", options);
    // Parse JSON response
    const data = await res.json();
    // Return transcription data and HTTP status
    return { data, status: res.status };
  } catch (error) {
    // Log any network or parsing errors
    console.error(error);
  }
};

// -------------------------------
// getTextCompetion
// -------------------------------
// Purpose:
// - Sends a text prompt to the backend API to generate AI text completion
// Input:
// - message: string containing the text prompt or message
// Output:
// - Returns an object containing `data` (completion result) and `status` (HTTP status code)
// Side Effects:
// - Calls the /api/create-text-completion endpoint
// - Handles errors by logging to console
export const getTextCompetion = async (message) => {
  // Prepare POST request with JSON body
  const options = {
    method: "POST",
    body: JSON.stringify({
      message, // Send message to backend for completion
    }),
    headers: {
      "Content-Type": "application/json", // Ensure backend interprets body as JSON
    },
  };

  try {
    // Perform fetch request to backend API
    const res = await fetch("/api/create-text-completion", options);
    // Parse JSON response
    const data = await res.json();
    // Return data and HTTP status
    return { data, status: res.status };
  } catch (error) {
    // Log errors for debugging
    console.error(error);
  }
};

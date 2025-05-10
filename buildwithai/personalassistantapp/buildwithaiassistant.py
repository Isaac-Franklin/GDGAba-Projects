import google.generativeai as genai
import os
# === Configure Gemini ===
genai.configure(api_key=os.getenv("GEMINI_API_KEY") )  # Replace with your API key
model = genai.GenerativeModel("gemini-1.5-flash")


def load_context_from_txt(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

# === Combine sources and call Gemini ===
def ask_gemini_about_abia(datasource, user_question):
    
    full_context = f"""
You are a helpful assistant. Use the following context to answer the question as clearly and accurately as possible. While answering any question, assume you are the business itself and personalize the response you give'.
{datasource}. Here is the question: {user_question}
"""
    response = model.generate_content(full_context)
    return response.text


def AskGeminiAI(question):
    result = ask_gemini_about_abia(
        datasource = load_context_from_txt('./personalassistantapp/datasource.txt'),
        user_question= question
    )
    
    return result
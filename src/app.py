from flask import Flask, request, render_template_string
from flask_cors import CORS  # Import CORS
import google.generativeai as genai
import re

# Corrected the variable from name to _name_
app = Flask(__name__)
CORS(app)  # Enable CORS on the Flask app

# Configure the API with your API key
genai.configure(api_key="AIzaSyBe6ECqglSLA1VOMqBOnHnGWKcqNNtOkDw")

# Set up the model configuration
generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}

# Define safety settings for content generation
safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
]

# Initialize the model
model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

# Initial prompt part
prompt_parts = [
    "My name is GymAi.bot. I am here to answer all questions related gym and workout and diet.",
    "Is the question below related to gym, diet,food and good helath? If yes, respond with 'yes'.  Otherwise, respond with 'no'."
]
prompt_parts1 = [
    "My name is GymAi.bot. I am here to answer all the questions about gym, diet,food and good helath.",

]

import re


def format_response_text(text):
    # Split the text into lines for processing
    lines = text.split('\n')

    formatted_lines = []
    for line in lines:
        # Check if the line starts with a number, indicating a new section or exercise
        if re.match(r"^\*\*(\d+)\.", line):
            # Add a line break before new sections for better readability
            formatted_lines.append('<br>')

        # Bold the exercise names and steps
        line = re.sub(r"\*\*(.*?)\*\*", r"<strong>\1</strong>", line)

        # Convert bullet points to HTML list items
        line = re.sub(r"\* (.*?) \*", r"<li>\1</li>", line)

        formatted_lines.append(line)

    # Join the lines into a single string, adding line breaks for separation
    formatted_text = "<br>".join(formatted_lines)

    # Wrap list items in <ul> tags if they exist
    if "<li>" in formatted_text:
        formatted_text = re.sub(r"(<li>.*?</li>)", r"<ul>\1</ul>", formatted_text, flags=re.DOTALL)

    return formatted_text


@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        data = request.json
        user_input = data['user_input']

        # Choose which base prompt to use; this example uses prompt_parts


        # Append the user input to the base prompt

        try:
            gen_response = model.generate_content(user_input)
            # Check if the response is successful and contains text
            if gen_response and hasattr(gen_response, 'text') and gen_response.text:
                response_text = format_response_text(gen_response.text)
                return {'response': response_text}
            else:
                return {'response': "Unable to generate a response. Please try again."}
        except Exception as e:
            print(e)  # For debugging purposes, to see what went wrong
            return {'response': "An error occurred. Please try again."}
    else:
        return "Submit a question to get started."


# Corrected the check for running the application
if __name__ == '__main__':
    app.run(debug=True)

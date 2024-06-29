---
tags:
- Prompt
---

# IF Chat Prompt👨‍💻
## Documentation
- Class name: `IF_ChatPrompt`
- Category: `ImpactFrames💥🎞️`
- Output node: `True`

The IF Chat Prompt node is designed to facilitate interactive chat sessions by generating questions and responses based on image prompts. It leverages various AI engines to interpret visual content and engage users in meaningful dialogue, enhancing the interactive experience within the ComfyUI framework.
## Input types
### Required
- **`image_prompt`**
    - A multiline string input that serves as the basis for generating chat prompts, allowing users to describe or upload images for the AI to interpret and respond to.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`base_ip`**
    - Specifies the base IP address of the AI engine server, enabling the node to connect and communicate with the selected AI engine for processing requests.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`port`**
    - Defines the port number for the AI engine server connection, facilitating the node's access to the AI engine's services.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`engine`**
    - Selects the AI engine to be used for generating chat prompts, offering a choice among various options like ollama, kobold, groq, openai, and anthropic.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`selected_model`**
    - Allows for the selection of a specific model from the chosen AI engine, although it's currently set to accept an empty tuple, indicating no specific model selection.
    - Comfy dtype: `[]`
    - Python dtype: `tuple`
- **`profile`**
    - Chooses a user profile that can influence the AI's response style and content, based on predefined profiles within the node.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`max_tokens`**
    - Sets the maximum number of tokens (words) the AI can generate for each response, with a configurable range to control the verbosity of the AI's output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`temperature`**
    - Adjusts the creativity or randomness of the AI's responses, with a scale that influences how predictable or varied the responses will be.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`top_k`**
    - Limits the AI's choices to the top-k most likely next words, focusing the response generation on a narrower set of options.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`top_p`**
    - Applies a probability threshold to filter the AI's choices, ensuring that only words with a cumulative probability above this threshold are considered.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`repeat_penalty`**
    - Imposes a penalty on repeating words or phrases, encouraging the AI to produce more diverse and less repetitive responses.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`image`**
    - unknown
    - Comfy dtype: `IMAGE`
    - Python dtype: `unknown`
- **`seed`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`random`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
- **`keep_alive`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
- **`stop`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`history_steps`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
## Output types
- **`Question`**
    - Comfy dtype: `STRING`
    - The generated question based on the image prompt, designed to initiate or continue the chat interaction.
    - Python dtype: `str`
- **`Response`**
    - Comfy dtype: `STRING`
    - The AI-generated response to the user's input or question, contributing to the ongoing dialogue.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IFChatPrompt:

    RETURN_TYPES = ("STRING", "STRING",)
    RETURN_NAMES = ("Question", "Response",)
    FUNCTION = "describe_picture"
    OUTPUT_NODE = True
    CATEGORY = "ImpactFrames💥🎞️"

    @classmethod
    def INPUT_TYPES(cls):
        node = cls()
        return {
            "required": {
                "image_prompt": ("STRING", {"multiline": True, "default": ""}),
                "base_ip": ("STRING", {"default": node.base_ip}),
                "port": ("STRING", {"default": node.port}),
                "engine": (["ollama", "kobold", "groq", "openai", "anthropic"], {"default": node.engine}),
                #"selected_model": (node.get_models("node.engine", node.base_ip, node.port), {}), 
                "selected_model": ((), {}),
                "profile": ([name for name in node.profiles.keys()], {"default": node.profile}),
                "max_tokens": ("INT", {"default": 2048, "min": 1, "max": 8192}),
                "temperature": ("FLOAT", {"default": 0.7, "min": 0.0, "max": 1.0, "step": 0.1}),
                "top_k": ("INT", {"default": 50, "min": 0, "max": 100}),
                "top_p": ("FLOAT", {"default": 0.95, "min": 0.0, "max": 1.0, "step": 0.1}),
                "repeat_penalty": ("FLOAT", {"default": 1.2, "min": 0.0, "max": 10.0, "step": 0.1}),
            },
            "optional": {
                "image": ("IMAGE", ),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "random": ("BOOLEAN", {"default": False, "label_on": "Seed", "label_off": "Temperature"}),
                "keep_alive": ("BOOLEAN", {"default": False, "label_on": "Keeps_Model", "label_off": "Unloads_Model"}),
                "stop": ("STRING", {"default": "", "multiline": False, "label": "stop something like <|end_of_text|>"}),
                "history_steps": ("INT", {"default": 10, "min": 0, "max": 0xffffffffffffffff}),
            },
            "hidden": {
                "model": ("STRING", {"default": ""}),
            },
        }

    @classmethod
    def IS_CHANGED(cls, engine, base_ip, port, profile, keep_alive, seed, random, history_steps):
        node = cls()
        seed_changed = seed != node.seed or random != node.random
        other_changes = (
            engine != node.engine
            or base_ip != node.base_ip
            or port != node.port
            or node.selected_model != node.get_models(engine, base_ip, port)
            or profile != node.profile
            or keep_alive != node.keep_alive
            or history_steps != node.history_steps
        )

        if seed_changed or other_changes:
            node.engine = engine
            node.base_ip = base_ip
            node.port = port
            node.selected_model = node.get_models(engine, base_ip, port)
            node.profile = profile
            node.keep_alive = keep_alive
            node.seed = seed
            node.random = random
            node.history_steps = history_steps
            return True
        return False
    
    def __init__(self):
        self.base_ip = "localhost" 
        self.port = "11434"     
        self.engine = "ollama" 
        self.selected_model = ""
        self.profile = "Cortana"
        self.comfy_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        self.presets_dir = os.path.join(os.path.dirname(__file__), "presets")
        self.profiles_file = os.path.join(self.presets_dir, "profiles.json")
        self.profiles = self.load_presets(self.profiles_file)
        self.chat_history = []
        self.history_steps = 10



    def load_presets(self, file_path):
        with open(file_path, 'r') as f:
            presets = json.load(f)
        return presets
   
    def get_api_key(self, api_key_name, engine):
        if engine != "ollama":  
            api_key = os.getenv(api_key_name)
            if api_key:
                return api_key
        else:
            print(f'you are using ollama as the engine, no api key is required')

    def get_models(self, engine, base_ip, port):
        if engine == "groq":   
            return ["gemma-7b-it", "llama2-70b-4096", "llama3-70b-8192", "llama3-8b-8192","mixtral-8x7b-32768"]
        elif engine == "ollama":
            api_url = f'http://{base_ip}:{port}/api/tags'
            try:
                response = requests.get(api_url)
                response.raise_for_status()
                models = [model['name'] for model in response.json().get('models', [])]
                return models
            except Exception as e:
                print(f"Failed to fetch models from Ollama: {e}")
                return []
        elif engine == "kobold":
            api_url = f'http://{base_ip}:{port}/api/v1/model'
            try:
                response = requests.get(api_url)
                response.raise_for_status()
                model = response.json()['result']
                return [model]
            except Exception as e:
                print(f"Failed to fetch models from Kobold: {e}")
                return []
        elif engine == "anthropic":
            return ["claude-3-opus-20240229", "claude-3-sonnet-20240229", "claude-3-haiku-20240307"]
        elif engine == "openai":
            return ["gpt-4-0125-preview", "gpt-4-1106-preview", "gpt-4-vision-preview", "gpt-4-1106-vision-preview", "gpt-3.5-turbo-0125", "gpt-3.5-turbo-1106"]
        else:
            print(f"Unsupported engine - {engine}")
            return []

    def tensor_to_image(self, tensor):
        # Ensure tensor is on CPU
        tensor = tensor.cpu()
        # Normalize tensor 0-255 and convert to byte
        image_np = tensor.squeeze().mul(255).clamp(0, 255).byte().numpy()
        # Create PIL image
        image = Image.fromarray(image_np, mode='RGB')
        return image
    
    def prepare_messages(self, image_prompt, profile, image=None):
        profile_selected = self.profiles.get(profile, "")
        
        if image is not None:
            system_message = textwrap.dedent("""
                Analyze the image provided, search for relevant details from the image to include on your response.
                Reply to the user's specific question or prompt and include relevant details extracted from the image.
            """)
        else:
            system_message = ""
        
        system_message = f"{profile_selected}\n{system_message}"
        
        user_message = image_prompt if image_prompt.strip() != "" else "Please provide a general description of the image."

        messages = [
            {"role": "system", "content": system_message}
        ]

        # Add the conversation history and user message regardless of history being empty
        for message in self.chat_history:
            messages.append({"role": message["role"], "content": message["content"]})

        messages.append({"role": "user", "content": user_message})

        return user_message, system_message, messages


   
    def describe_picture(self, image_prompt, engine, selected_model, base_ip, port, profile, temperature, max_tokens, seed, random, history_steps, keep_alive, top_k, top_p, repeat_penalty, stop, image=None):
        if image is not None:
            if isinstance(image, torch.Tensor):
                # Convert the tensor to a PIL image
                pil_image = self.tensor_to_image(image)
            elif isinstance(image, Image.Image):
                pil_image = image
            elif isinstance(image, str) and os.path.isfile(image):
                pil_image = Image.open(image)
            else:
                print(f"Invalid image type: {type(image)}. Expected torch.Tensor, PIL.Image, or file path.")
                return "Invalid image type", ""

            # Convert the PIL image to base64
            buffered = BytesIO()
            pil_image.save(buffered, format="PNG")
            base64_image = base64.b64encode(buffered.getvalue()).decode('utf-8')
        else:
            base64_image = None

        available_models = self.get_models(engine, base_ip, port)
        if available_models is None or selected_model not in available_models:
            error_message = f"Invalid model selected: {selected_model} for engine {engine}. Available models: {available_models}"
            print(error_message)
            raise ValueError(error_message)

        system_message, user_message, messages = self.prepare_messages(image_prompt, profile, image)
        self.chat_history = self.chat_history[-history_steps:] if history_steps > 0 else [] 
        if engine == "ollama":
            if stop == "":
                stop = None 
            else:
                stop = ["\n", f"{stop}"]
        elif engine == "kobold":
            if stop == "":
                stop = None 
            else:
                stop = ["\n\n\n\n\n", f"{stop}"]
        else:
            stop = None
        try:
            generated_text = self.send_request(engine, selected_model, base_ip, port, base64_image, 
                    system_message, user_message, messages, temperature, max_tokens, 
                    seed, random, keep_alive, top_k, top_p, repeat_penalty, stop)
            description = f"{generated_text}".strip()
            self.chat_history.append({"role": "user", "content": user_message})
            self.chat_history.append({"role": "assistant", "content": description})
            """print("Conversation History:")
            for message in self.chat_history:
                role = message["role"]
                content = message["content"]
                print(f"{role.capitalize()}: {content}")"""

            return image_prompt, description
        except Exception as e:
            print(f"Exception occurred: {e}")
            return "Exception occurred while processing image.", ""      

    def send_request(self, engine, selected_model, base_ip, port, base64_image, 
                    system_message, user_message, messages, temperature, max_tokens, 
                    seed, random, keep_alive, top_k, top_p, repeat_penalty, stop):
        api_functions = {
            "groq": send_groq_request,
            "anthropic": send_anthropic_request,
            "openai": send_openai_request,
            "kobold": send_kobold_request,
            "ollama": send_ollama_request
        }

        if engine not in api_functions:
            raise ValueError(f"Invalid engine: {engine}")

        api_function = api_functions[engine]

        if engine == "kobold":
            response = api_function(f"http://{base_ip}:{port}/api/v1/generate", stop, 
                                    system_message=system_message, user_message=user_message, 
                                    messages=messages, base64_image=base64_image, 
                                    max_length=max_tokens, temperature=temperature, 
                                    top_k=top_k, top_p=top_p, rep_pen=repeat_penalty)
        elif engine == "ollama":
            response = api_function(f"http://{base_ip}:{port}/api/generate", base64_image, 
                                    selected_model, system_message, user_message, messages, 
                                    temperature, max_tokens, seed, random, keep_alive, 
                                    top_k, top_p, repeat_penalty, stop)
        else:
            api_key = self.get_api_key(f"{engine.upper()}_API_KEY", engine)
            response = api_function(selected_model, system_message, user_message, messages, api_key, temperature, max_tokens, base64_image)

        # Update chat history after receiving the response
        self.chat_history.append({"role": "user", "content": user_message})
        self.chat_history.append({"role": "assistant", "content": response})

        return response

```

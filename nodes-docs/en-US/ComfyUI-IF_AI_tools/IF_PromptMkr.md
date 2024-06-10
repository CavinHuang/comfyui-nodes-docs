---
tags:
- Prompt
---

# IF Prompt to Prompt💬
## Documentation
- Class name: `IF_PromptMkr`
- Category: `ImpactFrames💥🎞️`
- Output node: `False`

The IF_PromptMkr node is designed to transform input prompts into more detailed or stylistically altered prompts, leveraging various AI engines and customization options. It enriches the original prompt with embellishments, styles, or negations based on user-defined parameters, aiming to generate more impactful and contextually rich prompts for creative or analytical applications.
## Input types
### Required
- **`input_prompt`**
    - The initial prompt provided by the user, serving as the base for further embellishment or modification. It's crucial for defining the thematic direction of the generated output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`base_ip`**
    - Specifies the base IP address for the AI engine's API, determining where the request for prompt transformation is sent.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`port`**
    - The port number used in conjunction with the base IP to access the AI engine's API.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`engine`**
    - The choice of AI engine (e.g., ollama, openai, anthropic) to use for processing the input prompt, affecting the style and capabilities of the generated output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`selected_model`**
    - The specific model selected for generating the output, dependent on the chosen engine and available models.
    - Comfy dtype: `[]`
    - Python dtype: `tuple`
- **`profile`**
    - A predefined set of parameters or 'profile' that influences the generation process, such as tone or complexity.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`embellish_prompt`**
    - An optional parameter to add additional descriptive elements to the input prompt, enhancing its detail or thematic depth.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`style_prompt`**
    - An optional parameter to apply a specific style or tone to the input prompt, altering its presentation or narrative voice.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`neg_prompt`**
    - An optional parameter to introduce negations or constraints to the input prompt, guiding the generation away from certain themes or concepts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`temperature`**
    - Controls the creativity or randomness of the generated output, with higher values allowing for more varied responses.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`max_tokens`**
    - The maximum number of tokens (words or characters) that the generated output can contain, setting a limit on its length.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - A seed value for the random number generator, ensuring reproducibility of the generated output when set.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`random`**
    - A boolean parameter that, when true, uses a random seed for generation, otherwise it uses a fixed temperature setting.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`keep_alive`**
    - Determines whether the AI model remains loaded after generation, affecting response time and resource usage.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`Question`**
    - Comfy dtype: `STRING`
    - The original input prompt, returned unchanged as part of the output.
    - Python dtype: `str`
- **`Response`**
    - Comfy dtype: `STRING`
    - The enriched or stylistically altered prompt, generated based on the input prompt and customization options.
    - Python dtype: `str`
- **`Negative`**
    - Comfy dtype: `STRING`
    - A prompt generated with negations or constraints, based on the neg_prompt parameter.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IFPrompt2Prompt: 
    RETURN_TYPES = ("STRING", "STRING", "STRING",)
    RETURN_NAMES = ("Question", "Response", "Negative",)
    FUNCTION = "sample"
    OUTPUT_NODE = False
    CATEGORY = "ImpactFrames💥🎞️"

    @classmethod
    def INPUT_TYPES(cls):
        node = cls()
        return {
            "required": {
                "input_prompt": ("STRING", {"multiline": True, "default": "Ancient mega-structure, small lone figure in the foreground"}),
                "base_ip": ("STRING", {"default": node.base_ip}),
                "port": ("STRING", {"default": node.port}),
                "engine": (["ollama", "openai", "anthropic"], {"default": node.engine}),
                #"selected_model": (node.get_models("node.engine", node.base_ip, node.port), {}), 
                "selected_model": ((), {}),
                "profile": ([name for name in node.profiles.keys()], {"default": node.profile}),
                "embellish_prompt": ([name for name in node.embellish_prompts.keys()], {}),
                "style_prompt": ([name for name in node.style_prompts.keys()], {}),
                "neg_prompt": ([name for name in node.neg_prompts.keys()], {}),
                "temperature": ("FLOAT", {"default": 0.7, "min": 0.0, "max": 1.0, "step": 0.1}),
            },
            "optional": {
                "max_tokens": ("INT", {"default": 256, "min": 1, "max": 8192}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "random": ("BOOLEAN", {"default": False, "label_on": "Seed", "label_off": "Temperature"}),
                "keep_alive": ("BOOLEAN", {"default": False, "label_on": "Keeps_Model", "label_off": "Unloads_Model"}),
            },
            "hidden": {
                "model": ("STRING", {"default": ""}),
            },
        }
    @classmethod
    def IS_CHANGED(cls, engine, base_ip, port, profile, keep_alive):
        node = cls()
        if engine != node.engine or base_ip != node.base_ip or port != node.port or node.selected_model != node.get_models(engine, base_ip, port) or keep_alive != node.keep_alive:
            node.engine = engine
            node.base_ip = base_ip
            node.port = port
            node.selected_model = node.get_models(engine, base_ip, port)
            node.profile = profile
            node.keep_alive = keep_alive
            return True
        return False

    def __init__(self):
        self.base_ip = "localhost" 
        self.port = "11434"     
        self.engine = "ollama" 
        self.selected_model = ""
        self.profile = "IF_PromptMKR"
        self.comfy_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        self.presets_dir = os.path.join(os.path.dirname(__file__), "presets")
        self.profiles_file = os.path.join(self.presets_dir, "profiles.json")
        self.profiles = self.load_presets(self.profiles_file)
        self.neg_prompts_file = os.path.join(self.presets_dir, "neg_prompts.json")
        self.embellish_prompts_file = os.path.join(self.presets_dir, "embellishments.json")
        self.style_prompts_file = os.path.join(self.presets_dir, "style_prompts.json")
        self.neg_prompts = self.load_presets(self.neg_prompts_file)
        self.embellish_prompts = self.load_presets(self.embellish_prompts_file)
        self.style_prompts = self.load_presets(self.style_prompts_file)
        
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
        if engine == "ollama":
            api_url = f'http://{base_ip}:{port}/api/tags'
            try:
                response = requests.get(api_url)
                response.raise_for_status()
                models = [model['name'] for model in response.json().get('models', [])]
                return models
            except Exception as e:
                print(f"Failed to fetch models from Ollama: {e}")
                return []
        elif engine == "anthropic":
            return ["claude-3-opus-20240229", "claude-3-sonnet-20240229", "claude-3-haiku-20240307"]
        elif engine == "openai":
            return ["gpt-4-0125-preview", "gpt-4-1106-preview", "gpt-4-vision-preview", "gpt-4-1106-vision-preview", "gpt-3.5-turbo-0125", "gpt-3.5-turbo-1106"]
        else:
            print(f"Unsupported engine - {engine}")
            return []
              
    def sample(self, input_prompt, engine, base_ip, port, selected_model, embellish_prompt, style_prompt, neg_prompt, temperature, max_tokens, seed, random, keep_alive, profile):
        embellish_content = self.embellish_prompts.get(embellish_prompt, "")
        style_content = self.style_prompts.get(style_prompt, "")
        neg_content = self.neg_prompts.get(neg_prompt, "")
        profile_selected = self.profiles.get(profile, "")

        if engine == "anthropic":
            data = {
                'model': selected_model,
                'system': profile_selected ,
                'messages': [
                    {"role": "user", "content": input_prompt}
                ],
                'temperature': temperature,
                'max_tokens': max_tokens
            }
        elif engine == "openai":
            if random == True:
                data = {
                    'model': selected_model, 
                    'messages': [
                        {"role": "system", "content": profile_selected },
                        {"role": "user", "content": input_prompt}
                    ],
                    'temperature': temperature,
                    'seed': seed,
                    'max_tokens': max_tokens  
                }
            else:
                data = {
                    'model': selected_model, 
                    'messages': [
                        {"role": "system", "content": profile_selected },
                        {"role": "user", "content": input_prompt}
                    ],
                    'temperature': temperature,
                    'max_tokens': max_tokens  
                }
        else:
            if random == True:
                data = {
                    "model": selected_model,
                    "system": profile_selected ,
                    "prompt": input_prompt,
                    "stream": False,
                    "options": {
                        "temperature": temperature,
                        "seed": seed,
                        "num_ctx": max_tokens,
                    },
                    "keep_alive": -1 if keep_alive else 0,
                }      
            else:
                data = {
                    "model": selected_model,
                    "system": profile_selected ,
                    "prompt": input_prompt,
                    "stream": False,
                    "options": {
                        "temperature": temperature,
                        "seed": seed,
                        "num_ctx": max_tokens,
                    },
                    "keep_alive": -1 if keep_alive else 0,
                }

        generated_text = self.send_request(engine, base_ip, port, data, headers={"Content-Type": "application/json"})

        if generated_text:
            combined_prompt = f"{embellish_content} {generated_text} {style_content}"
            return input_prompt, combined_prompt, neg_content
        else:
            return None, None, None
              
    def send_request(self, engine, base_ip, port, data, headers):
        if engine == "ollama":
            api_url = f'http://{base_ip}:{port}/api/generate'
            response = requests.post(api_url, headers=headers, json=data)
            if response.status_code == 200:
                response_data = response.json()
                prompt_response = response_data.get('response', 'No response text found')
                
                # Ensure there is a response to construct the full description
                if prompt_response != 'No response text found':
                    return prompt_response
                else:
                    return "No valid response generated for the image."
            else:
                print(f"Failed to fetch response, status code: {response.status_code}")
                return "Failed to fetch response from Ollama."
        elif engine == "anthropic":
            anthropic_api_key = self.get_api_key("ANTHROPIC_API_KEY", engine)
            try:
                base_url = 'https://api.anthropic.com/v1/messages'
                anthropic_headers = {
                    "x-api-key": anthropic_api_key,
                    "anthropic-version": "2023-06-01",  
                    "Content-Type": "application/json"
                }
                response = requests.post(base_url, headers=anthropic_headers, json=data)
                if response.status_code == 200:
                    messages = response.json().get('content', [])
                    generated_text = ''.join([msg.get('text', '') for msg in messages if msg.get('type') == 'text'])
                    return generated_text
                else:
                    print(f"Error: Request failed with status code {response.status_code}, Response: {response.text}")
                    return None
            except Exception as e:
                print(f"Error: Anthropic request failed - {e}")
                return None
        elif engine == "openai":
            openai_api_key = self.get_api_key("OPENAI_API_KEY", engine)
            try:
                base_url = 'https://api.openai.com/v1/chat/completions'
                openai_headers = {
                    "Authorization": f"Bearer {openai_api_key}",
                    "Content-Type": "application/json"
                }
                response = requests.post(base_url, headers=openai_headers, json=data)
                if response.status_code == 200:
                    response_data = response.json()
                    print("Debug Response:", response_data)  
                    choices = response_data.get('choices', [])
                    if choices:
                        choice = choices[0]
                        messages = choice.get('message', {'content': ''})  
                        generated_text = messages.get('content', '') 
                        return generated_text
                    else:
                        print("No choices found in response")
                        return None
                else:
                    print(f"Error: Request failed with status code {response.status_code}, Response: {response.text}")
                    return None
            except Exception as e:
                print(f"Error: OpenAI request failed - {e}")
                return None, None, None

```

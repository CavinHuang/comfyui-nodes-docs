
# Documentation
- Class name: IF_PromptMkr
- Category: ImpactFrames💥🎞️
- Output node: False
- Repo Ref: https://github.com/ImACodeLearner/ComfyUI-IMPACT-PACK

IF_PromptMkr节点旨在将输入的提示转化为更详细或风格化的提示，利用各种人工智能引擎和自定义选项。它根据用户定义的参数，通过添加修饰、风格或否定来丰富原始提示，目的是为创意或分析应用生成更具影响力和上下文丰富的提示。

# Input types
## Required
- input_prompt
    - 用户提供的初始提示，作为进一步修饰或修改的基础。它对定义生成输出的主题方向至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- base_ip
    - 指定人工智能引擎API的基本IP地址，决定提示转换请求的发送目标。
    - Comfy dtype: STRING
    - Python dtype: str
- port
    - 与基本IP一起使用的端口号，用于访问人工智能引擎的API。
    - Comfy dtype: STRING
    - Python dtype: str
- engine
    - 选择用于处理输入提示的人工智能引擎（如ollama、openai、anthropic），影响生成输出的风格和功能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list[str]
- selected_model
    - 用于生成输出的具体模型，取决于所选引擎和可用模型。
    - Comfy dtype: []
    - Python dtype: tuple
- profile
    - 预定义的参数集或"配置文件"，影响生成过程，如语气或复杂度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list[str]
- embellish_prompt
    - 可选参数，用于为输入提示添加额外的描述元素，增强其细节或主题深度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list[str]
- style_prompt
    - 可选参数，用于对输入提示应用特定的风格或语气，改变其呈现方式或叙述声音。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list[str]
- neg_prompt
    - 可选参数，用于引入否定或约束到输入提示中，引导生成远离某些主题或概念。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list[str]
- temperature
    - 控制生成输出的创造性或随机性，较高的值允许更多样化的响应。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- max_tokens
    - 生成输出可包含的最大标记（单词或字符）数量，设定其长度限制。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 随机数生成器的种子值，设置时确保生成输出的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- random
    - 布尔参数，为真时使用随机种子进行生成，否则使用固定的温度设置。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- keep_alive
    - 决定AI模型在生成后是否保持加载状态，影响响应时间和资源使用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- Question
    - Comfy dtype: STRING
    - 原始输入提示，作为输出的一部分不变返回。
    - Python dtype: str
- Response
    - Comfy dtype: STRING
    - 基于输入提示和自定义选项生成的丰富或风格化的提示。
    - Python dtype: str
- Negative
    - Comfy dtype: STRING
    - 基于neg_prompt参数生成的带有否定或约束的提示。
    - Python dtype: str


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


# Documentation
- Class name: IF_ImagePrompt
- Category: ImpactFrames💥🎞️
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

IF_ImagePrompt 节点是一个强大的工具，它能够将视觉输入转化为文本提示。该节点利用用户配置文件和图像特征生成定制的文本描述。它涵盖了解释图像、应用主题修饰以及整合风格或负面提示的过程，从而产生丰富、具有上下文感知的文本输出。

# Input types
## Required
- image
    - 作为文本提示生成基础的视觉输入。它支持多种格式，包括 torch.Tensor、PIL.Image 或文件路径，使其适用于不同的输入源。
    - Comfy dtype: IMAGE
    - Python dtype: Union[torch.Tensor, PIL.Image, str]
- image_prompt
    - 与图像相关的初始提示，可以为空或根据用户输入填写，影响生成文本的方向。
    - Comfy dtype: STRING
    - Python dtype: str
- base_ip
    - AI引擎所在服务器的IP地址，用于远程处理和生成。
    - Comfy dtype: STRING
    - Python dtype: str
- port
    - 用于访问AI引擎的服务器端口号，确保正确的通信和数据交换。
    - Comfy dtype: STRING
    - Python dtype: str
- engine
    - 指定用于生成文本提示的AI引擎，允许灵活选择底层技术。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- selected_model
    - 确定所选引擎中用于文本生成的特定模型，实现对输出的精细控制。
    - Comfy dtype: []
    - Python dtype: str
- profile
    - 影响生成文本的主题方向和内容的用户配置文件，实现输出的个性化。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- embellish_prompt
    - 添加到提示中的主题修饰，用特定主题或想法丰富文本输出。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- style_prompt
    - 提示的风格叠加层，引导生成文本的语气或风格以匹配所需的美学效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- neg_prompt
    - 用于引导生成文本避开某些主题或概念的负面提示，增强内容控制。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- temperature
    - 控制AI响应的创造性，影响生成文本的变异性和不可预测性。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- max_tokens
    - 设置生成文本的最大长度，确保输出在所需的约束范围内。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 随机数生成器的种子值，使文本生成过程中的输出可重现。
    - Comfy dtype: INT
    - Python dtype: int
- random
    - 指示是否在文本生成中引入随机性的标志，增加不可预测性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- keep_alive
    - 决定请求后是否应保持与AI引擎的连接，优化重复使用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- Question
    - 从输入图像和用户配置文件派生的初始图像提示或问题，为生成的文本设定上下文。
    - Comfy dtype: STRING
    - Python dtype: str
- Response
    - 生成文本的主体部分，根据输入提示丰富了修饰、风格和主题内容。
    - Comfy dtype: STRING
    - Python dtype: str
- Negative
    - 生成文本的一个特定段落，专门处理负面提示，确保避免某些主题或概念。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IFImagePrompt:

    RETURN_TYPES = ("STRING", "STRING", "STRING",)
    RETURN_NAMES = ("Question", "Response", "Negative",)
    FUNCTION = "describe_picture"
    OUTPUT_NODE = True
    CATEGORY = "ImpactFrames💥🎞️"

    @classmethod
    def INPUT_TYPES(cls):
        node = cls()
        return {
            "required": {
                "image": ("IMAGE", ),
                "image_prompt": ("STRING", {"multiline": True, "default": ""}),
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
                "max_tokens": ("INT", {"default": 160, "min": 1, "max": 8192}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "random": ("BOOLEAN", {"default": False, "label_on": "Seed", "label_off": "Temperature"}),
                "keep_alive": ("BOOLEAN", {"default": False, "label_on": "Keeps_Model", "label_off": "Unloads_Model"}),
            },
            "hidden": {
                "model": ("STRING", {"default": ""}),
            },
        }

    @classmethod
    def IS_CHANGED(cls, engine, base_ip, port, keep_alive, profile):
        node = cls()
        if engine != node.engine or base_ip != node.base_ip or port != node.port or node.selected_model != node.get_models(engine, base_ip, port) or keep_alive != node.keep_alive or profile != profile:
            node.engine = engine
            node.base_ip = base_ip
            node.port = port
            node.selected_model = node.get_models(engine, base_ip, port)
            node.keep_alive = keep_alive
            node.profile = profile
            return True
        return False
    
    def __init__(self):
        self.base_ip = "localhost" 
        self.port = "11434"     
        self.engine = "ollama" 
        self.selected_model = ""
        self.profile = "IF_PromptMKR_IMG"
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

    def tensor_to_image(self, tensor):
        # Ensure tensor is on CPU
        tensor = tensor.cpu()
        # Normalize tensor 0-255 and convert to byte
        image_np = tensor.squeeze().mul(255).clamp(0, 255).byte().numpy()
        # Create PIL image
        image = Image.fromarray(image_np, mode='RGB')
        return image


    def prepare_messages(self, image_prompt, profile):
        profile_selected = self.profiles.get(profile, "")
        empty_image_prompt = "Make a visual prompt for the following Image:"
        filled_image_prompt = textwrap.dedent("""\
            Act as a visual prompt maker with the following guidelines:
            - Describe the image in vivid detail.
            - Break keywords by commas.
            - Provide high-quality, non-verbose, coherent, concise, and not superfluous descriptions.
            - Focus solely on the visual elements of the picture; avoid art commentaries or intentions.
            - Construct the prompt by describing framing, subjects, scene elements, background, aesthetics.
            - Limit yourself up to 7 keywords per component  
            - Be varied and creative.
            - Always reply on the same line, use around 100 words long. 
            - Do not enumerate or enunciate components.
            - Do not include any additional information in the response.                                                       
            The following is an illustartive example for you to see how to construct a prompt your prompts should follow this format but always coherent to the subject worldbuilding or setting and consider the elements relationship:
            'Epic, Cover Art, Full body shot, dynamic angle, A Demon Hunter, standing, lone figure, glow eyes, deep purple light, cybernetic exoskeleton, sleek, metallic, glowing blue accents, energy weapons. Fighting Demon, grotesque creature, twisted metal, glowing red eyes, sharp claws, Cyber City, towering structures, shrouded haze, shimmering energy. Ciberpunk, dramatic lighthing, highly detailed. ' 
             """)
        if image_prompt.strip() == "":
            system_message = filled_image_prompt
            user_message = empty_image_prompt
        else:
            system_message = profile_selected 
            user_message = image_prompt

        return system_message, user_message


    def describe_picture(self, image, engine, selected_model, base_ip, port, image_prompt, embellish_prompt, style_prompt, neg_prompt, temperature, max_tokens, seed, random, keep_alive, profile):

        embellish_content = self.embellish_prompts.get(embellish_prompt, "")
        style_content = self.style_prompts.get(style_prompt, "")
        neg_content = self.neg_prompts.get(neg_prompt, "")
        
        # Check the type of the 'image' object
        if isinstance(image, torch.Tensor):
            # Convert the tensor to a PIL image
            pil_image = self.tensor_to_image(image)
        elif isinstance(image, Image.Image):
            pil_image = image
        elif isinstance(image, str) and os.path.isfile(image):
            pil_image = Image.open(image)
        else:
            print(f"Invalid image type: {type(image)}. Expected torch.Tensor, PIL.Image, or file path.")
            return "Invalid image type"

        # Convert the PIL image to base64
        buffered = BytesIO()
        pil_image.save(buffered, format="PNG")
        base64_image = base64.b64encode(buffered.getvalue()).decode('utf-8')

        available_models = self.get_models(engine, base_ip, port)
        if available_models is None or selected_model not in available_models:
            error_message = f"Invalid model selected: {selected_model} for engine {engine}. Available models: {available_models}"
            print(error_message)
            raise ValueError(error_message)

        system_message, user_message = self.prepare_messages(image_prompt, profile)

        try:
            generated_text = self.send_request(engine, selected_model, base_ip, port, base64_image, system_message, user_message, temperature, max_tokens, seed, random, keep_alive)
            description = f"{embellish_content} {generated_text} {style_content}".strip()
            return  image_prompt, description, neg_content
        except Exception as e:
            print(f"Exception occurred: {e}")
            return "Exception occurred while processing image."


    def send_request(self, engine, selected_model, base_ip, port, base64_image, system_message, user_message, temperature, max_tokens, seed, random, keep_alive): 
        if engine == "anthropic":
            anthropic_api_key = self.get_api_key("ANTHROPIC_API_KEY", engine)
            anthropic_headers = {
                "x-api-key": anthropic_api_key,
                "anthropic-version": "2023-06-01",  
                "Content-Type": "application/json"
            }

            data = {
                "model": selected_model,
                "system": system_message,
                "messages": [
                    {
                        "role": "user",
                        "content": [
                                {
                                    "type": "image",
                                    "source": {
                                        "type": "base64",
                                        "media_type": "image/png",
                                        "data": base64_image
                                    }
                                },
                            {"type": "text", "text": user_message}
                        ]
                    }
                ],
                "temperature": temperature,
                "max_tokens": max_tokens
            }
            
            api_url = 'https://api.anthropic.com/v1/messages'

            response = requests.post(api_url, headers=anthropic_headers, json=data)
            if response.status_code == 200:
                response_data = response.json()
                messages = response_data.get('content', [])
                generated_text = ''.join([msg.get('text', '') for msg in messages if msg.get('type') == 'text'])
                return generated_text
            else:
                print(f"Error: Request failed with status code {response.status_code}, Response: {response.text}")
                return "Failed to fetch response from Anthropic."
                
        elif engine == "openai":
            openai_api_key = self.get_api_key("OPENAI_API_KEY", engine)
            openai_headers = {
                "Authorization": f"Bearer {openai_api_key}",
                "Content-Type": "application/json"
            }
            if random == True:
                data = {
                    "model": selected_model,
                    "messages": [
                        {
                            "role": "system",
                            "content": system_message
                        },
                        {
                            "role": "user",
                            "content": [
                                {
                                    "type": "text",
                                    "text": user_message
                                },
                                {
                                    "type": "image_url",
                                    "image_url": f"data:image/png;base64,{base64_image}"
                                }
                            ]
                        }
                    ],
                    "temperature": temperature,
                    "seed": seed,
                    "max_tokens": max_tokens
                }
            else:
                data = {
                    "model": selected_model,
                    "messages": [
                        {
                            "role": "system",
                            "content": system_message
                        },
                        {
                            "role": "user",
                            "content": [
                                {
                                    "type": "text",
                                    "text": user_message
                                },
                                {
                                    "type": "image_url",
                                    "image_url": f"data:image/png;base64,{base64_image}"
                                }
                            ]
                        }
                    ],
                    "temperature": temperature,
                    "max_tokens": max_tokens
                }

            api_url = 'https://api.openai.com/v1/chat/completions'
            response = requests.post(api_url, headers=openai_headers, json=data)
            if response.status_code == 200:
                response_data = response.json()
                print("Debug Response:", response_data)
                choices = response_data.get('choices', [])
                if choices:
                    choice = choices[0]
                    message = choice.get('message', {})
                    generated_text = message.get('content', '')
                    return generated_text
                else:
                    print("No valid choices in the response.")
                    print("Full response:", response.text)
                    return "No valid response generated for the image."
            else:
                print(f"Failed to fetch response, status code: {response.status_code}")
                print("Full response:", response.text)
                return "Failed to fetch response from OpenAI."

        else:
            api_url = f'http://{base_ip}:{port}/api/generate'
            if random == True:
                data = {
                    "model": selected_model,
                    "system": system_message,
                    "prompt": user_message,
                    "stream": False,
                    "images": [base64_image],
                    "options": {
                        "temperature": temperature,
                        "seed": seed,
                        "num_ctx": max_tokens
                    },
                    "keep_alive": -1 if keep_alive else 0,
                }
            else:
                data = {
                    "model": selected_model,
                    "system": system_message,
                    "prompt": user_message,
                    "stream": False,
                    "images": [base64_image],
                    "options": {
                        "temperature": temperature,
                        "num_ctx": max_tokens,
                    },
                    "keep_alive": -1 if keep_alive else 0,
                }

            ollama_headers = {"Content-Type": "application/json"}
            response = requests.post(api_url, headers=ollama_headers, json=data)
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

```

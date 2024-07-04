
# Documentation
- Class name: StabilityAPI_SD3
- Category: KJNodes/experimental
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

StabilityAPI_SD3节点旨在与StabilityAI API进行交互，用于生成图像或对现有图像进行转换。该节点简化了与API交互的复杂性，使用户能够专注于创意任务。

# Input types
## Required
- prompt
    - 接受文本描述或提示来引导图像生成过程，基于提供的文本影响视觉输出。
    - Comfy dtype: STRING
    - Python dtype: str
- n_prompt
    - 指定要使用的提示数量，允许多个提示影响生成过程。
    - Comfy dtype: STRING
    - Python dtype: int
- seed
    - 随机数生成器的种子值，确保生成图像的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- model
    - 定义用于图像生成的模型，允许根据所需特征或功能进行选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- aspect_ratio
    - 设置输出图像的宽高比，实现对图像尺寸的控制。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- output_format
    - 确定输出图像的格式，如JPEG或PNG，以满足用户偏好。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Optional
- api_key
    - 访问StabilityAI API所需的API密钥，确保授权使用。
    - Comfy dtype: STRING
    - Python dtype: str
- image
    - 用于img2img任务的初始图像，作为转换或增强的基础。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- img2img_strength
    - 控制在img2img任务中应用于初始图像的转换强度，调整变化程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- disable_metadata
    - 禁用在生成图像中嵌入元数据的选项，提供对隐私和数据存储的控制。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- image
    - 节点执行结果生成或转换的图像。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- ui
    - 节点返回一个用户界面组件，通常用于显示生成或转换后的图像。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StabilityAPI_SD3:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "prompt": ("STRING", {"multiline": True}),
                "n_prompt": ("STRING", {"multiline": True}),
                "seed": ("INT", {"default": 123,"min": 0, "max": 4294967294, "step": 1}),
                "model": (
                [   
                    'sd3',
                    'sd3-turbo',
                ],
                {
                "default": 'sd3'
                 }),
                 "aspect_ratio": (
                [   
                    '1:1',
                    '16:9',
                    '21:9',
                    '2:3',
                    '3:2',
                    '4:5',
                    '5:4',
                    '9:16',
                    '9:21',
                ],
                {
                "default": '1:1'
                }),
                "output_format": (
                [   
                    'png',
                    'jpeg',
                ],
                {
                "default": 'jpeg'
                 }),                 
            },
            "optional": {
                "api_key": ("STRING", {"multiline": True}),
                "image": ("IMAGE",),
                "img2img_strength": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "disable_metadata": ("BOOLEAN", {"default": True}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apicall"

    CATEGORY = "KJNodes/experimental"
    DESCRIPTION = """
## Calls StabilityAI API
   
Although you may have multiple keys in your account,  
you should use the same key for all requests to this API.  

Get your API key here: https://platform.stability.ai/account/keys  
Recommended to set the key in the config.json -file under this  
node packs folder.  
# WARNING:  
Otherwise the API key may get saved in the image metadata even  
with "disable_metadata" on if the workflow includes save nodes  
separate from this node.  
   
sd3 requires 6.5 credits per generation  
sd3-turbo requires 4 credits per generation  

If no image is provided, mode is set to text-to-image  

"""

    def apicall(self, prompt, n_prompt, model, seed, aspect_ratio, output_format, 
                img2img_strength=0.5, image=None, disable_metadata=True, api_key=""):
        from comfy.cli_args import args
        if disable_metadata:
            args.disable_metadata = True
        else:
            args.disable_metadata = False
        
        import requests
        from io import BytesIO
        from torchvision import transforms
        
        data = {
                "mode": "text-to-image",
                "prompt": prompt,
                "model": model,
                "seed": seed,
                "output_format": output_format
                }
        
        if image is not None:
            image = image.permute(0, 3, 1, 2).squeeze(0)
            to_pil = transforms.ToPILImage()
            pil_image = to_pil(image)
            # Save the PIL Image to a BytesIO object
            buffer = BytesIO()
            pil_image.save(buffer, format='PNG')
            buffer.seek(0)
            files = {"image": ("image.png", buffer, "image/png")}
           
            data["mode"] = "image-to-image"
            data["image"] = pil_image
            data["strength"] = img2img_strength
        else:
            data["aspect_ratio"] = aspect_ratio,
            files = {"none": ''}
        
        if model != "sd3-turbo":
            data["negative_prompt"] = n_prompt

        headers={
                "accept": "image/*"
            }
        
        if api_key != "":
            headers["authorization"] = api_key
        else:
            config_file_path = os.path.join(script_directory,"config.json")
            with open(config_file_path, 'r') as file:
                config = json.load(file)
            api_key_from_config = config.get("sai_api_key")
            headers["authorization"] = api_key_from_config            
        
        response = requests.post(
            f"https://api.stability.ai/v2beta/stable-image/generate/sd3",
            headers=headers,
            files = files,
            data = data,
        )

        if response.status_code == 200:
            # Convert the response content to a PIL Image
            image = Image.open(BytesIO(response.content))
            # Convert the PIL Image to a PyTorch tensor
            transform = transforms.ToTensor()
            tensor_image = transform(image)
            tensor_image = tensor_image.unsqueeze(0)
            tensor_image = tensor_image.permute(0, 2, 3, 1).cpu().float()
            return (tensor_image,)
        else:
            try:
                # Attempt to parse the response as JSON
                error_data = response.json()
                raise Exception(f"Server error: {error_data}")
            except json.JSONDecodeError:
                # If the response is not valid JSON, raise a different exception
                raise Exception(f"Server error: {response.text}")

```

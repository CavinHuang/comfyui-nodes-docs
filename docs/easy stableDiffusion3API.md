
# Documentation
- Class name: easy stableDiffusion3API
- Category: EasyUse/API
- Output node: False

该节点利用Stable Diffusion模型生成图像，允许用户指定正面和负面提示词，选择模型变体，定义宽高比，并调整种子和降噪级别等参数，以实现定制化的图像创作。

# Input types
## Required
- positive
    - 正面提示词引导图像生成朝向所需的主题或元素，通过指定要包含的内容来影响模型的输出。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 负面提示词引导图像生成远离某些主题或元素，有助于避免模型输出中的不期望方面。
    - Comfy dtype: STRING
    - Python dtype: str
- model
    - 指定要使用的Stable Diffusion模型变体，允许在标准模式和turbo模式之间进行选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- aspect_ratio
    - 确定生成图像的宽高比，提供一系列预定义的比例以满足各种需求。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- seed
    - 设置随机数生成器的种子，实现跨图像生成的可重复结果。
    - Comfy dtype: INT
    - Python dtype: int
- denoise
    - 调整应用于生成图像的降噪级别，范围从0（无降噪）到1（完全降噪），影响清晰度和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- optional_image
    - 可选的图像输入，用于图像到图像转换或图像增强等任务，扩展节点的功能。
    - Comfy dtype: IMAGE
    - Python dtype: Image

# Output types
- image
    - 输出图像生成过程的结果，体现了输入提示词和参数的视觉表现。
    - Comfy dtype: IMAGE
    - Python dtype: Image
- ui
    - 提供一个用户界面组件，显示生成的图像或相关信息。


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class stableDiffusion3API:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "positive": ("STRING", {"default": "", "placeholder": "Positive", "multiline": True}),
                "negative": ("STRING", {"default": "", "placeholder": "Negative", "multiline": True}),
                "model": (["sd3", "sd3-turbo"],),
                "aspect_ratio": (['16:9', '1:1', '21:9', '2:3', '3:2', '4:5', '5:4', '9:16', '9:21'],),
                "seed": ("INT", {"default": 0, "min": 0, "max": 4294967294}),
                "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0}),
            },
            "optional": {
                "optional_image": ("IMAGE",),
            },
            "hidden": {
                "unique_id": "UNIQUE_ID",
                "extra_pnginfo": "EXTRA_PNGINFO",
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)

    FUNCTION = "generate"
    OUTPUT_NODE = False

    CATEGORY = "EasyUse/API"

    def generate(self, positive, negative, model, aspect_ratio, seed, denoise, optional_image=None, unique_id=None, extra_pnginfo=None):
        mode = 'text-to-image'
        if optional_image is not None:
            mode = 'image-to-image'
        output_image = stableAPI.generate_sd3_image(positive, negative, aspect_ratio, seed=seed, mode=mode, model=model, strength=denoise, image=optional_image)
        return (output_image,)

```

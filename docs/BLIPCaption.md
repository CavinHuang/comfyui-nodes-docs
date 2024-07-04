
# Documentation
- Class name: BLIPCaption
- Category: Art Venture/Captioning
- Output node: False

BLIPCaption节点旨在使用BLIP模型为图像生成文本描述。它利用深度学习技术分析视觉内容，并根据图像的元素和上下文生成描述性的、类似人类的文本。这个节点可以通过为生成的描述添加前缀和后缀来进行定制，并且支持调整输出文本的长度以满足特定要求。

# Input types
## Required
- image
    - 需要生成描述的输入图像。这是节点处理以生成文本描述的主要数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- min_length
    - 指定生成描述的最小长度。这个参数有助于确保描述不会过于简短，能够传达足够的细节。
    - Comfy dtype: INT
    - Python dtype: int
- max_length
    - 设置描述的最大长度。这个约束确保生成的文本简洁明了，避免过于冗长的描述。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- device_mode
    - 决定BLIP模型将在哪种设备（CPU或GPU）上运行，根据可用硬件优化性能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- prefix
    - 可选的文本，用于在生成的描述前添加，允许包含额外的上下文或信息。
    - Comfy dtype: STRING
    - Python dtype: str
- suffix
    - 可选的文本，用于在生成的描述后添加，适用于添加额外的细节或说明。
    - Comfy dtype: STRING
    - Python dtype: str
- enabled
    - 用于启用或禁用描述生成功能的标志。当禁用时，它会返回一个默认的描述结构。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- blip_model
    - 可选的预加载BLIP模型，用于生成描述。如果未提供，节点将根据可用的检查点加载模型。
    - Comfy dtype: BLIP_MODEL
    - Python dtype: torch.nn.Module

# Output types
- caption
    - 为输入图像生成的描述，可选择添加前缀和后缀进行丰富。这些描述提供了视觉内容的文本表示。
    - Comfy dtype: STRING
    - Python dtype: List[str]


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ShowText|pysssss](../../ComfyUI-Custom-Scripts/Nodes/ShowText|pysssss.md)



## Source code
```python
class BlipCaption:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "min_length": (
                    "INT",
                    {
                        "default": 24,
                        "min": 0,  # minimum value
                        "max": 200,  # maximum value
                        "step": 1,  # slider's step
                    },
                ),
                "max_length": (
                    "INT",
                    {
                        "default": 48,
                        "min": 0,  # minimum value
                        "max": 200,  # maximum value
                        "step": 1,  # slider's step
                    },
                ),
            },
            "optional": {
                "device_mode": (["AUTO", "Prefer GPU", "CPU"],),
                "prefix": ("STRING", {"default": ""}),
                "suffix": ("STRING", {"default": ""}),
                "enabled": ("BOOLEAN", {"default": True}),
                "blip_model": ("BLIP_MODEL",),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("caption",)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "blip_caption"
    CATEGORY = "Art Venture/Captioning"

    def blip_caption(
        self, image, min_length, max_length, device_mode="AUTO", prefix="", suffix="", enabled=True, blip_model=None
    ):
        if not enabled:
            return ([join_caption("", prefix, suffix)],)

        if blip_model is None:
            ckpts = folder_paths.get_filename_list("blip")
            if len(ckpts) == 0:
                ckpts = download_model(
                    model_path=model_dir,
                    model_url=model_url,
                    ext_filter=[".pth"],
                    download_name="model_base_caption_capfilt_large.pth",
                )
            blip_model = load_blip(ckpts[0])

        device = gpu if device_mode != "CPU" else cpu
        blip_model = blip_model.to(device)

        try:
            captions = []

            with torch.no_grad():
                for img in image:
                    img = tensor2pil(img)
                    tensor = transformImage(img)
                    caption = blip_model.generate(
                        tensor,
                        sample=False,
                        num_beams=1,
                        min_length=min_length,
                        max_length=max_length,
                    )

                    caption = join_caption(caption[0], prefix, suffix)
                    captions.append(caption)

            return (captions,)
        except:
            raise
        finally:
            if device_mode == "AUTO":
                blip_model = blip_model.to(cpu)

```

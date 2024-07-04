
# Documentation
- Class name: ttN pipeIN
- Category: ttN/legacy
- Output node: False

ttN pipeIN节点是ttN/legacy类别中的一个基础元素，旨在为生成任务初始化和配置管道。它封装了设置各种组件（如模型、条件元素和潜在空间）的过程，促进了构建一个结构化的、可以进行进一步处理或生成的管道。

# Input types
## Required
- model
    - 指定用于管道的生成模型，作为其他元素配置的核心组件。
    - Comfy dtype: MODEL
    - Python dtype: str
- pos
    - 定义正面条件信息，用于引导生成模型朝向期望的输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- neg
    - 指定负面条件信息，用于引导生成模型远离不期望的输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent
    - 表示潜在空间配置，为生成过程提供基础。
    - Comfy dtype: LATENT
    - Python dtype: str
- vae
    - 指定VAE（变分自编码器）组件，用于生成过程中的编码和解码。
    - Comfy dtype: VAE
    - Python dtype: str
- clip
    - 定义用于文本和图像之间语义理解和对齐的CLIP模型。
    - Comfy dtype: CLIP
    - Python dtype: str
- seed
    - 设置随机种子以确保生成过程的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- image
    - 可选参数，用于指定在管道中使用的初始图像。
    - Comfy dtype: IMAGE
    - Python dtype: str

# Output types
- pipe
    - 输出一个配置好的管道对象，封装了指定的模型、条件和配置，以供进一步处理。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipe_IN:
    version = '1.1.0'
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "pos": ("CONDITIONING",),
                "neg": ("CONDITIONING",),
                "latent": ("LATENT",),
                "vae": ("VAE",),
                "clip": ("CLIP",),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            },"optional": {
                "image": ("IMAGE",),
            },
            "hidden": {"ttNnodeVersion": ttN_pipe_IN.version},
        }

    RETURN_TYPES = ("PIPE_LINE", )
    RETURN_NAMES = ("pipe", )
    FUNCTION = "flush"

    CATEGORY = "ttN/legacy"

    def flush(self, model, pos=0, neg=0, latent=0, vae=0, clip=0, image=0, seed=0):
        pipe = {"model": model,
                "positive": pos,
                "negative": neg,
                "vae": vae,
                "clip": clip,

                "refiner_model": None,
                "refiner_positive": None,
                "refiner_negative": None,
                "refiner_vae": None,
                "refiner_clip": None,

                "samples": latent,
                "images": image,
                "seed": seed,

                "loader_settings": {}
        }
        return (pipe, )

```

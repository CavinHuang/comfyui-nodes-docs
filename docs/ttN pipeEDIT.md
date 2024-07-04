
# Documentation
- Class name: ttN pipeEDIT
- Category: ttN/pipe
- Output node: False

ttN pipeEDIT节点旨在编辑和优化管道输出，允许对通过管道处理的数据进行调整和增强。它专注于修改现有的管道数据，以满足特定要求或提高输出质量。

# Input types
## Required
## Optional
- pipe
    - 表示要编辑或优化的管道数据。此参数对于确定要应用的编辑范围和性质至关重要。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- model
    - 指定要编辑或优化的管道的模型组件。
    - Comfy dtype: MODEL
    - Python dtype: str
- pos
    - 指定要编辑或优化的管道的正面条件组件。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- neg
    - 指定要编辑或优化的管道的负面条件组件。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent
    - 指定要编辑或优化的管道的潜在组件。
    - Comfy dtype: LATENT
    - Python dtype: int
- vae
    - 指定要编辑或优化的管道的VAE组件。
    - Comfy dtype: VAE
    - Python dtype: str
- clip
    - 指定要编辑或优化的管道的CLIP组件。
    - Comfy dtype: CLIP
    - Python dtype: str
- image
    - 指定要编辑或优化的管道的图像组件。
    - Comfy dtype: IMAGE
    - Python dtype: str
- seed
    - 指定要编辑或优化的管道的种子组件。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- pipe
    - Comfy dtype: PIPE_LINE
    - 经过编辑的管道数据，反映了应用的修改。
    - Python dtype: dict
- model
    - Comfy dtype: MODEL
    - 经过编辑的管道模型组件。
    - Python dtype: str
- pos
    - Comfy dtype: CONDITIONING
    - 经过编辑的管道正面条件组件。
    - Python dtype: str
- neg
    - Comfy dtype: CONDITIONING
    - 经过编辑的管道负面条件组件。
    - Python dtype: str
- latent
    - Comfy dtype: LATENT
    - 经过编辑的管道潜在组件。
    - Python dtype: int
- vae
    - Comfy dtype: VAE
    - 经过编辑的管道VAE组件。
    - Python dtype: str
- clip
    - Comfy dtype: CLIP
    - 经过编辑的管道CLIP组件。
    - Python dtype: str
- image
    - Comfy dtype: IMAGE
    - 经过编辑的管道图像组件。
    - Python dtype: str
- seed
    - Comfy dtype: INT
    - 经过编辑的管道种子组件。
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipe_EDIT:
    version = '1.1.1'
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {},
                "optional": {
                    "pipe": ("PIPE_LINE",),
                    "model": ("MODEL",),
                    "pos": ("CONDITIONING",),
                    "neg": ("CONDITIONING",),
                    "latent": ("LATENT",),
                    "vae": ("VAE",),
                    "clip": ("CLIP",),
                    "image": ("IMAGE",),
                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff, "forceInput": True}),
                },
                "hidden": {"ttNnodeVersion": ttN_pipe_EDIT.version, "my_unique_id": "UNIQUE_ID"},
            }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "CLIP", "IMAGE", "INT")
    RETURN_NAMES = ("pipe", "model", "pos", "neg", "latent", "vae", "clip", "image", "seed")
    FUNCTION = "flush"

    CATEGORY = "ttN/pipe"

    def flush(self, pipe=None, model=None, pos=None, neg=None, latent=None, vae=None, clip=None, image=None, seed=None, my_unique_id=None):

        model = model or pipe.get("model")
        if model is None:
            ttNl("Model missing from pipeLine").t(f'pipeEdit[{my_unique_id}]').warn().p()
        pos = pos or pipe.get("positive")
        if pos is None:
            ttNl("Positive conditioning missing from pipeLine").t(f'pipeEdit[{my_unique_id}]').warn().p()
        neg = neg or pipe.get("negative")
        if neg is None:
            ttNl("Negative conditioning missing from pipeLine").t(f'pipeEdit[{my_unique_id}]').warn().p()
        samples = latent or pipe.get("samples")
        if samples is None:
            ttNl("Latent missing from pipeLine").t(f'pipeEdit[{my_unique_id}]').warn().p()
        vae = vae or pipe.get("vae")
        if vae is None:
            ttNl("VAE missing from pipeLine").t(f'pipeEdit[{my_unique_id}]').warn().p()
        clip = clip or pipe.get("clip")
        if clip is None:
            ttNl("Clip missing from pipeLine").t(f'pipeEdit[{my_unique_id}]').warn().p()
        image = image or pipe.get("images")
        if image is None:
            ttNl("Image missing from pipeLine").t(f'pipeEdit[{my_unique_id}]').warn().p()
        seed = seed or pipe.get("seed")
        if seed is None:
            ttNl("Seed missing from pipeLine").t(f'pipeEdit[{my_unique_id}]').warn().p()

        new_pipe = {
            "model": model,
            "positive": pos,
            "negative": neg,
            "vae": vae,
            "clip": clip,

            "samples": samples,
            "images": image,
            "seed": seed,

            "loader_settings": pipe["loader_settings"],
        }
        del pipe

        return (new_pipe, )

```

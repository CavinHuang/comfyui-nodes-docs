
# Documentation
- Class name: ttN pipeOUT
- Category: ttN/legacy
- Output node: False

ttN pipeOUT节点旨在聚合和输出生成式管道的各个组件,包括模型、条件数据、潜在表示和生成的图像。它作为管道的最后一步,整合输出以供进一步处理或可视化。

# Input types
## Required
- pipe
    - 'pipe'参数代表管道状态,封装了所有相关数据,包括模型、条件输入和生成的输出。它对节点的操作至关重要,因为它决定了输出的内容和结构。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]

# Output types
- model
    - Comfy dtype: MODEL
    - 管道中使用的模型。
    - Python dtype: str
- pos
    - Comfy dtype: CONDITIONING
    - 正面条件数据。
    - Python dtype: str
- neg
    - Comfy dtype: CONDITIONING
    - 负面条件数据。
    - Python dtype: str
- latent
    - Comfy dtype: LATENT
    - 管道生成的潜在表示。
    - Python dtype: str
- vae
    - Comfy dtype: VAE
    - 管道中使用的VAE模型。
    - Python dtype: str
- clip
    - Comfy dtype: CLIP
    - 管道中使用的CLIP模型。
    - Python dtype: str
- image
    - Comfy dtype: IMAGE
    - 生成的图像。
    - Python dtype: str
- seed
    - Comfy dtype: INT
    - 用于管道中随机数生成的种子。
    - Python dtype: int
- pipe
    - Comfy dtype: PIPE_LINE
    - 整个管道状态,封装了所有输入和输出。
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipe_OUT:
    version = '1.1.0'
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pipe": ("PIPE_LINE",),
                },
            "hidden": {"ttNnodeVersion": ttN_pipe_OUT.version},
            }

    RETURN_TYPES = ("MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "CLIP", "IMAGE", "INT", "PIPE_LINE",)
    RETURN_NAMES = ("model", "pos", "neg", "latent", "vae", "clip", "image", "seed", "pipe")
    FUNCTION = "flush"

    CATEGORY = "ttN/legacy"
    
    def flush(self, pipe):
        model = pipe.get("model")
        pos = pipe.get("positive")
        neg = pipe.get("negative")
        latent = pipe.get("samples")
        vae = pipe.get("vae")
        clip = pipe.get("clip")
        image = pipe.get("images")
        seed = pipe.get("seed")

        return model, pos, neg, latent, vae, clip, image, seed, pipe

```

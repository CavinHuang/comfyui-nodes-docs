
# Documentation
- Class name: `SDXL Fundamentals MultiPipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

SDXL Fundamentals MultiPipe节点旨在聚合并简化图像合成的基本组件配置过程，包括模型、CLIP和条件设置。它通过允许各种组件的可选输入来简化设置，并返回一套全面的配置，成为初始化和优化图像生成管道的中心节点。

# Input types
## Required
## Optional
- **`vae`**
    - 可选的VAE组件，用于图像合成过程，影响图像生成的初始阶段。
    - Comfy dtype: VAE
    - Python dtype: Optional[VAE]
- **`model_base`**
    - 可选的基础模型，用于初始图像生成过程，影响核心合成机制。
    - Comfy dtype: MODEL
    - Python dtype: Optional[Model]
- **`model_refiner`**
    - 可选的精炼模型，用于增强生成图像的细节，提高最终输出质量。
    - Comfy dtype: MODEL
    - Python dtype: Optional[Model]
- **`clip_base`**
    - 可选的基础CLIP模型，用于根据文本描述引导图像合成朝向期望的结果。
    - Comfy dtype: CLIP
    - Python dtype: Optional[CLIP]
- **`clip_refiner`**
    - 可选的精炼CLIP模型，用于细化生成的图像，确保与预期视觉概念更紧密对齐。
    - Comfy dtype: CLIP
    - Python dtype: Optional[CLIP]
- **`pos_base`**
    - 可选的基础正面条件，用于引导图像生成朝向特定属性或主题。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[Conditioning]
- **`neg_base`**
    - 可选的基础负面条件，用于避免生成图像中出现某些属性或主题。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[Conditioning]
- **`pos_refiner`**
    - 可选的精炼正面条件，用于进一步细化生成的图像，使其更接近特定属性或主题。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[Conditioning]
- **`neg_refiner`**
    - 可选的精炼负面条件，用于在细化的图像中进一步避免某些属性或主题。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[Conditioning]
- **`seed`**
    - 可选的种子值，用于确定性图像生成，确保结果的可重现性。
    - Comfy dtype: INT
    - Python dtype: Optional[int]

# Output types
- **`vae`**
    - Comfy dtype: VAE
    - 图像合成过程中使用的VAE组件。
    - Python dtype: VAE
- **`model_base`**
    - Comfy dtype: MODEL
    - 用于初始图像生成的基础模型。
    - Python dtype: Model
- **`model_refiner`**
    - Comfy dtype: MODEL
    - 用于增强生成图像细节的精炼模型。
    - Python dtype: Model
- **`clip_base`**
    - Comfy dtype: CLIP
    - 基础设置中用于引导图像合成的CLIP模型。
    - Python dtype: CLIP
- **`clip_refiner`**
    - Comfy dtype: CLIP
    - 用于细化生成图像的CLIP模型。
    - Python dtype: CLIP
- **`pos_base`**
    - Comfy dtype: CONDITIONING
    - 应用于引导图像生成的基础正面条件。
    - Python dtype: Conditioning
- **`neg_base`**
    - Comfy dtype: CONDITIONING
    - 应用于避免生成图像中某些主题的基础负面条件。
    - Python dtype: Conditioning
- **`pos_refiner`**
    - Comfy dtype: CONDITIONING
    - 应用于进一步细化生成图像的精炼正面条件。
    - Python dtype: Conditioning
- **`neg_refiner`**
    - Comfy dtype: CONDITIONING
    - 应用于在细化图像中进一步避免某些主题的精炼负面条件。
    - Python dtype: Conditioning
- **`seed`**
    - Comfy dtype: INT
    - 用于确定性图像生成的种子值。
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SDXL_Fundamentals_MultiPipe:

    CATEGORY = 'JPS Nodes/Pipes'
    RETURN_TYPES = ("VAE","MODEL","MODEL","CLIP","CLIP","CONDITIONING","CONDITIONING","CONDITIONING","CONDITIONING","INT",)
    RETURN_NAMES = ("vae","model_base","model_refiner","clip_base","clip_refiner","pos_base","neg_base","pos_refiner","neg_refiner","seed",)
    FUNCTION = "get_sdxlfund"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "optional": {
                "vae": ("VAE",),
                "model_base": ("MODEL",),
                "model_refiner": ("MODEL",),
                "clip_base": ("CLIP",),
                "clip_refiner": ("CLIP",),
                "pos_base": ("CONDITIONING",), 
                "neg_base": ("CONDITIONING",),
                "pos_refiner": ("CONDITIONING",),
                "neg_refiner": ("CONDITIONING",),
                "seed": ("INT", {}),
            }
        }

    def get_sdxlfund(self,vae=None,model_base=None,model_refiner=None,clip_base=None,clip_refiner=None,pos_base=None,neg_base=None,pos_refiner=None,neg_refiner=None,seed=None):
        
        return (vae,model_base,model_refiner,clip_base,clip_refiner,pos_base,neg_base,pos_refiner,neg_refiner,seed,)

```

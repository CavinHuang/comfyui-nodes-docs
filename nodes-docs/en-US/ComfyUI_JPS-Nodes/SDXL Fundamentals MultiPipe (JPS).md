---
tags:
- Image
- Pipeline
---

# SDXL Fundamentals MultiPipe (JPS)
## Documentation
- Class name: `SDXL Fundamentals MultiPipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

The SDXL Fundamentals MultiPipe node is designed to aggregate and streamline the process of configuring fundamental components for image synthesis, including models, clips, and conditioning settings. It simplifies the setup by allowing optional inputs for various components and returns a comprehensive set of configurations, making it a central node for initializing and refining image generation pipelines.
## Input types
### Required
### Optional
- **`vae`**
    - Optional VAE component for the image synthesis process, affecting the initial stages of image generation.
    - Comfy dtype: `VAE`
    - Python dtype: `Optional[VAE]`
- **`model_base`**
    - Optional base model for the initial image generation process, influencing the core synthesis mechanism.
    - Comfy dtype: `MODEL`
    - Python dtype: `Optional[Model]`
- **`model_refiner`**
    - Optional refiner model to enhance the details of the generated images, improving the final output quality.
    - Comfy dtype: `MODEL`
    - Python dtype: `Optional[Model]`
- **`clip_base`**
    - Optional CLIP model for the base setup, used for guiding the image synthesis towards the desired outcome based on textual descriptions.
    - Comfy dtype: `CLIP`
    - Python dtype: `Optional[CLIP]`
- **`clip_refiner`**
    - Optional CLIP model for refining the generated images, ensuring closer alignment with the intended visual concepts.
    - Comfy dtype: `CLIP`
    - Python dtype: `Optional[CLIP]`
- **`pos_base`**
    - Optional base positive conditioning to steer the image generation towards specific attributes or themes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[Conditioning]`
- **`neg_base`**
    - Optional base negative conditioning to avoid certain attributes or themes in the generated images.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[Conditioning]`
- **`pos_refiner`**
    - Optional refiner positive conditioning to further refine the generated images towards more specific attributes or themes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[Conditioning]`
- **`neg_refiner`**
    - Optional refiner negative conditioning to further avoid certain attributes or themes in the refined images.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[Conditioning]`
- **`seed`**
    - Optional seed for deterministic image generation, ensuring reproducibility of the results.
    - Comfy dtype: `INT`
    - Python dtype: `Optional[int]`
## Output types
- **`vae`**
    - Comfy dtype: `VAE`
    - The VAE component used in the image synthesis process.
    - Python dtype: `VAE`
- **`model_base`**
    - Comfy dtype: `MODEL`
    - The base model used for the initial image generation.
    - Python dtype: `Model`
- **`model_refiner`**
    - Comfy dtype: `MODEL`
    - The refiner model used to enhance the details of the generated images.
    - Python dtype: `Model`
- **`clip_base`**
    - Comfy dtype: `CLIP`
    - The CLIP model used for guiding the image synthesis in the base setup.
    - Python dtype: `CLIP`
- **`clip_refiner`**
    - Comfy dtype: `CLIP`
    - The CLIP model used for refining the generated images.
    - Python dtype: `CLIP`
- **`pos_base`**
    - Comfy dtype: `CONDITIONING`
    - The base positive conditioning applied to steer the image generation.
    - Python dtype: `Conditioning`
- **`neg_base`**
    - Comfy dtype: `CONDITIONING`
    - The base negative conditioning applied to avoid certain themes in the generated images.
    - Python dtype: `Conditioning`
- **`pos_refiner`**
    - Comfy dtype: `CONDITIONING`
    - The refiner positive conditioning applied to further refine the generated images.
    - Python dtype: `Conditioning`
- **`neg_refiner`**
    - Comfy dtype: `CONDITIONING`
    - The refiner negative conditioning applied to further avoid certain themes in the refined images.
    - Python dtype: `Conditioning`
- **`seed`**
    - Comfy dtype: `INT`
    - The seed used for deterministic image generation.
    - Python dtype: `int`
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

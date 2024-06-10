---
tags:
- ImageNoise
- Noise
---

# IPAdapter Noise
## Documentation
- Class name: `IPAdapterNoise`
- Category: `ipadapter/utils`
- Output node: `False`

The IPAdapterNoise node specializes in adding noise to images, offering customizable noise types, strengths, and blur levels. It can optionally work with existing images to enhance or modify their appearance with noise, providing a versatile tool for image processing tasks that require noise injection for effects or testing purposes.
## Input types
### Required
- **`type`**
    - Specifies the type of noise to be added to the image, affecting the visual characteristics of the noise applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength`**
    - Determines the intensity of the noise added to the image, allowing for control over how pronounced the noise effect will be.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`blur`**
    - Applies a Gaussian blur to the noise, with the ability to adjust the level of blur for a smoother or more subtle noise effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`image_optional`**
    - An optional parameter that allows for the addition of noise to an existing image, enhancing or altering its appearance with noise.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a modified image tensor with applied noise, potentially blurred, reflecting the specified noise characteristics.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterNoise:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "type": (["fade", "dissolve", "gaussian", "shuffle"], ),
                "strength": ("FLOAT", { "default": 1.0, "min": 0, "max": 1, "step": 0.05 }),
                "blur": ("INT", { "default": 0, "min": 0, "max": 32, "step": 1 }),
            },
            "optional": {
                "image_optional": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "make_noise"
    CATEGORY = "ipadapter/utils"

    def make_noise(self, type, strength, blur, image_optional=None):
        if image_optional is None:
            image = torch.zeros([1, 224, 224, 3])
        else:
            transforms = T.Compose([
                T.CenterCrop(min(image_optional.shape[1], image_optional.shape[2])),
                T.Resize((224, 224), interpolation=T.InterpolationMode.BICUBIC, antialias=True),
            ])
            image = transforms(image_optional.permute([0,3,1,2])).permute([0,2,3,1])

        seed = int(torch.sum(image).item()) % 1000000007 # hash the image to get a seed, grants predictability
        torch.manual_seed(seed)

        if type == "fade":
            noise = torch.rand_like(image)
            noise = image * (1 - strength) + noise * strength
        elif type == "dissolve":
            mask = (torch.rand_like(image) < strength).float()
            noise = torch.rand_like(image)
            noise = image * (1-mask) + noise * mask
        elif type == "gaussian":
            noise = torch.randn_like(image) * strength
            noise = image + noise
        elif type == "shuffle":
            transforms = T.Compose([
                T.ElasticTransform(alpha=75.0, sigma=(1-strength)*3.5),
                T.RandomVerticalFlip(p=1.0),
                T.RandomHorizontalFlip(p=1.0),
            ])
            image = transforms(image.permute([0,3,1,2])).permute([0,2,3,1])
            noise = torch.randn_like(image) * (strength*0.75)
            noise = image * (1-noise) + noise

        del image
        noise = torch.clamp(noise, 0, 1)

        if blur > 0:
            if blur % 2 == 0:
                blur += 1
            noise = T.functional.gaussian_blur(noise.permute([0,3,1,2]), blur).permute([0,2,3,1])

        return (noise, )

```

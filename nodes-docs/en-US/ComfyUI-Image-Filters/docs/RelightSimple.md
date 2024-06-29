---
tags:
- VisualEffects
---

# Relight (Simple)
## Documentation
- Class name: `RelightSimple`
- Category: `image/filters`
- Output node: `False`

The RelightSimple node is designed to adjust the lighting of an image based on provided normal maps and directional light parameters. It allows for dynamic relighting effects, simulating different lighting conditions by altering the direction and brightness of the light source.
## Input types
### Required
- **`image`**
    - The input image to be relit. It serves as the base for the lighting adjustments.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`normals`**
    - Normal maps corresponding to the input image, used to calculate how light interacts with the surface.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`x_dir`**
    - The x-direction component of the light source, influencing the direction from which the light appears to come.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`y_dir`**
    - The y-direction component of the light source, affecting the vertical angle of the incoming light.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`brightness`**
    - Controls the intensity of the light source, allowing for brighter or dimmer lighting effects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image with adjusted lighting based on the provided normals and light direction parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RelightSimple:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "normals": ("IMAGE",),
                "x_dir": ("FLOAT", {"default": 0.0, "min": -1.5, "max": 1.5, "step": 0.01}),
                "y_dir": ("FLOAT", {"default": 0.0, "min": -1.5, "max": 1.5, "step": 0.01}),
                "brightness": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "relight"

    CATEGORY = "image/filters"

    def relight(self, image, normals, x_dir, y_dir, brightness):
        if image.shape[0] != normals.shape[0]:
            raise Exception("Batch size for image and normals must match")
        norm = normals.detach().clone() * 2 - 1
        norm = torch.nn.functional.interpolate(norm.movedim(-1,1), size=(image.shape[1], image.shape[2]), mode='bilinear').movedim(1,-1)
        light = torch.tensor([x_dir, y_dir, abs(1 - math.sqrt(x_dir ** 2 + y_dir ** 2) * 0.7)])
        light = torch.nn.functional.normalize(light, dim=0)
        
        diffuse = norm[:,:,:,0] * light[0] + norm[:,:,:,1] * light[1] + norm[:,:,:,2] * light[2]
        diffuse = torch.clip(diffuse.unsqueeze(3).repeat(1,1,1,3), 0, 1)
        
        relit = image.detach().clone()
        relit[:,:,:,:3] = torch.clip(relit[:,:,:,:3] * diffuse * brightness, 0, 1)
        return (relit,)

```


# Documentation
- Class name: RelightSimple
- Category: image/filters
- Output node: False

RelightSimple节点旨在根据提供的法线贴图和方向光参数来调整图像的光照效果。它允许通过改变光源的方向和亮度来实现动态重光照效果，从而模拟不同的光照条件。

# Input types
## Required
- image
    - 需要重新光照的输入图像。它作为光照调整的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- normals
    - 与输入图像对应的法线贴图，用于计算光线如何与表面相互作用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- x_dir
    - 光源的x方向分量，影响光线看似来自的方向。
    - Comfy dtype: FLOAT
    - Python dtype: float
- y_dir
    - 光源的y方向分量，影响入射光的垂直角度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- brightness
    - 控制光源的强度，允许创建更明亮或更昏暗的光照效果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 基于提供的法线贴图和光线方向参数调整后的输出图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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


# Documentation
- Class name: NormalMapSimple
- Category: image/filters
- Output node: False

NormalMapSimple节点旨在从输入图像生成法线贴图。它通过应用变换来模拟基于光照的表面变化和深度效果。该节点利用图像梯度创建一个纹理，用于表示三维空间中表面的方向，从而增强二维图像中的深度视觉感知。

# Input types
## Required
- images
    - images输入代表需要生成法线贴图的源图像。这个输入对于确定将被转换为法线贴图的纹理和深度信息至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- scale_XY
    - scale_XY参数用于调整生成的法线贴图中表面变化效果的强度。较高的值会通过缩放法线向量的x和y分量来增加感知到的深度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 输出是输入图像的转换版本，表现为法线贴图。这些贴图编码了表面方向和深度信息，增强了原始二维图像的三维表现效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class NormalMapSimple:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "scale_XY": ("FLOAT",{"default": 1, "min": 0, "max": 100, "step": 0.001}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "normal_map"

    CATEGORY = "image/filters"

    def normal_map(self, images, scale_XY):
        t = images.detach().clone().cpu().numpy().astype(np.float32)
        L = np.mean(t[:,:,:,:3], axis=3)
        for i in range(t.shape[0]):
            t[i,:,:,0] = cv2.Scharr(L[i], -1, 1, 0, cv2.BORDER_REFLECT) * -1
            t[i,:,:,1] = cv2.Scharr(L[i], -1, 0, 1, cv2.BORDER_REFLECT)
        t[:,:,:,2] = 1
        t = torch.from_numpy(t)
        t[:,:,:,:2] *= scale_XY
        t[:,:,:,:3] = torch.nn.functional.normalize(t[:,:,:,:3], dim=3) / 2 + 0.5
        return (t,)

```

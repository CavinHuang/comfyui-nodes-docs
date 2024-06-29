---
tags:
- DepthMap
- DepthMapEstimation
- Image
- NormalMap
---

# Normal Map (Simple)
## Documentation
- Class name: `NormalMapSimple`
- Category: `image/filters`
- Output node: `False`

The NormalMapSimple node is designed to generate normal maps from images, applying a transformation that simulates the appearance of surface variations and depth based on lighting. It utilizes image gradients to create a texture that represents the orientation of the surface in three-dimensional space, enhancing the visual perception of depth in 2D images.
## Input types
### Required
- **`images`**
    - The 'images' input represents the source images for which normal maps are to be generated. This input is crucial for determining the texture and depth information that will be transformed into a normal map.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`scale_XY`**
    - The 'scale_XY' parameter adjusts the intensity of the surface variation effect in the generated normal map. A higher value increases the perceived depth by scaling the x and y components of the normal vectors.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a transformed version of the input images, represented as normal maps. These maps encode the surface orientation and depth information, enhancing the 3D appearance of the original 2D images.
    - Python dtype: `torch.Tensor`
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

---
tags:
- ImageTransformation
- VisualEffects
---

# Jitter Image
## Documentation
- Class name: `JitterImage`
- Category: `image/filters/jitter`
- Output node: `False`

The `JitterImage` node applies a jitter effect to images, transforming them by applying a series of affine transformations to simulate camera or object movement. This effect can enhance the robustness of models to variations in input data or be used for data augmentation.
## Input types
### Required
- **`images`**
    - The input images to which the jitter effect will be applied. This parameter is crucial for defining the visual content that will undergo transformation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`jitter_scale`**
    - Defines the scale of the jitter effect, adjusting the intensity of the transformations applied to the images. This parameter allows for fine-tuning the extent of the jitter effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output images after the jitter effect has been applied, showcasing the transformed visual content.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class JitterImage:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "jitter_scale": ("FLOAT", {"default": 1.0, "min": 0.1, "step": 0.1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "jitter"

    CATEGORY = "image/filters/jitter"

    def jitter(self, images, jitter_scale):
        t = images.detach().clone().movedim(-1,1) # [B x C x H x W]
        
        theta = jitter_matrix.detach().clone().to(t.device)
        theta[:,0,2] *= jitter_scale * 2 / t.shape[3]
        theta[:,1,2] *= jitter_scale * 2 / t.shape[2]
        affine = torch.nn.functional.affine_grid(theta, torch.Size([9, t.shape[1], t.shape[2], t.shape[3]]))
        
        batch = []
        for i in range(t.shape[0]):
            jb = t[i].repeat(9,1,1,1)
            jb = torch.nn.functional.grid_sample(jb, affine, mode='bilinear', padding_mode='border', align_corners=None)
            batch.append(jb)
        
        t = torch.cat(batch, dim=0).movedim(1,-1) # [B x H x W x C]
        return (t,)

```

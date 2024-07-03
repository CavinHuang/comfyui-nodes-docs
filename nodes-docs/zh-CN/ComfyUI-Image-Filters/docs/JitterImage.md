
# Documentation
- Class name: `JitterImage`
- Category: `image/filters/jitter`
- Output node: `False`

JitterImage节点通过对图像应用一系列仿射变换来模拟相机或物体运动，从而在图像上产生抖动效果。这种效果可以增强模型对输入数据变化的鲁棒性，或用于数据增强。

# Input types
## Required
- images
    - 需要应用抖动效果的输入图像。这个参数对于定义将要进行变换的视觉内容至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- jitter_scale
    - 定义抖动效果的规模，调整应用于图像的变换强度。这个参数允许微调抖动效果的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 应用抖动效果后的输出图像，展示变换后的视觉内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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

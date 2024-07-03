
# Documentation
- Class name: UnJitterImage
- Category: image/filters/jitter
- Output node: False

UnJitterImage节点旨在消除或减轻图像中的抖动效果。它使用预定义的矩阵来调整图像中像素的位置，目的是恢复原始或更稳定的视觉表现。

# Input types
## Required
- images
    - 需要处理以校正抖动的输入图像。这个参数对于确定将应用去抖动操作的目标图像至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- jitter_scale
    - 定义要应用的抖动校正比例。该参数调整去抖动效果的强度，允许对校正过程进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- oflow_align
    - 一个布尔标志，指示是否应该使用光流对齐作为去抖动过程的一部分。这可以通过基于检测到的运动来对齐帧来增强校正效果，为抖动校正提供更动态的方法。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- image
    - 应用去抖动处理后的输出图像。预期这个图像会减少或消除抖动效果，呈现出更稳定和视觉连贯的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UnJitterImage:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "jitter_scale": ("FLOAT", {"default": 1.0, "min": 0.1, "step": 0.1}),
                "oflow_align": ("BOOLEAN", {"default": False}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "jitter"

    CATEGORY = "image/filters/jitter"

    def jitter(self, images, jitter_scale, oflow_align):
        t = images.detach().clone().movedim(-1,1) # [B x C x H x W]
        
        if oflow_align:
            pbar = ProgressBar(t.shape[0] // 9)
            raft_model, raft_device = load_raft()
            batch = []
            for i in trange(t.shape[0] // 9):
                batch1 = t[i*9].unsqueeze(0).repeat(9,1,1,1)
                batch2 = t[i*9:i*9+9]
                flows = raft_flow(raft_model, raft_device, batch1, batch2)
                batch.append(flows)
                pbar.update(1)
            flows = torch.cat(batch, dim=0)
            t = flow_warp(t, flows)
        else:
            theta = jitter_matrix.detach().clone().to(t.device)
            theta[:,0,2] *= jitter_scale * -2 / t.shape[3]
            theta[:,1,2] *= jitter_scale * -2 / t.shape[2]
            affine = torch.nn.functional.affine_grid(theta, torch.Size([9, t.shape[1], t.shape[2], t.shape[3]]))
            batch = []
            for i in range(t.shape[0] // 9):
                jb = t[i*9:i*9+9]
                jb = torch.nn.functional.grid_sample(jb, affine, mode='bicubic', padding_mode='border', align_corners=None)
                batch.append(jb)
            t = torch.cat(batch, dim=0)
        
        t = t.movedim(1,-1) # [B x H x W x C]
        return (t,)

```

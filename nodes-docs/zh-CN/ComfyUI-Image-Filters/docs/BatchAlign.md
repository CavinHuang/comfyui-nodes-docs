
# Documentation
- Class name: BatchAlign
- Category: image/filters
- Output node: False

BatchAlign节点旨在对多组数据批次进行对齐，确保不同输入集之间的一致性和统一性。它专注于调整数据批次的对齐方式，以便于后续更连贯的处理或分析。

# Input types
## Required
- images
    - 需要对齐的图像，通常涉及多个帧或批次，这些图像需要进行对齐以便进一步处理。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- ref_frame
    - 作为基准的参考帧或图像，其他图像将与之对齐。这作为对齐调整的基准线。
    - Comfy dtype: INT
    - Python dtype: torch.Tensor
- direction
    - 指定对齐的方向，可能影响图像相对于参考帧的调整方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- blur
    - 决定在对齐过程中应用的模糊级别，影响对齐图像的平滑度或锐利度。
    - Comfy dtype: INT
    - Python dtype: float

# Output types
- aligned
    - 对齐输入图像的结果，生成一组与参考帧对齐的连贯图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- flow
    - 指示应用于每个图像以进行对齐的流场或映射，有助于理解对齐过程。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BatchAlign:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "ref_frame": ("INT", {"default": 0, "min": 0}),
                "direction": (["forward", "backward"],),
                "blur": ("INT", {"default": 0, "min": 0}),
            },
        }

    RETURN_TYPES = ("IMAGE", "IMAGE")
    RETURN_NAMES = ("aligned", "flow")
    FUNCTION = "apply"

    CATEGORY = "image/filters"

    def apply(self, images, ref_frame, direction, blur):
        t = images.detach().clone().movedim(-1,1) # [B x C x H x W]
        rf = min(ref_frame, t.shape[0] - 1)
        
        raft_model, raft_device = load_raft()
        ref = t[rf].unsqueeze(0).repeat(t.shape[0],1,1,1)
        if direction == "forward":
            flows = raft_flow(raft_model, raft_device, ref, t)
        else:
            flows = raft_flow(raft_model, raft_device, t, ref) * -1
        
        if blur > 0:
            d = blur * 2 + 1
            dup = flows.movedim(1,-1).detach().clone().cpu().numpy()
            blurred = []
            for img in dup:
                blurred.append(torch.from_numpy(cv2.GaussianBlur(img, (d,d), 0)).unsqueeze(0).movedim(-1,1))
            flows = torch.cat(blurred).to(flows.device)
        
        t = flow_warp(t, flows)
        
        t = t.movedim(1,-1) # [B x H x W x C]
        f = images.detach().clone() * 0
        f[:,:,:,:2] = flows.movedim(1,-1)
        return (t,f)

```

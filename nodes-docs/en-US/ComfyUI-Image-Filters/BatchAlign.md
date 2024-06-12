---
tags:
- Latent
- Normalization
---

# Batch Align (RAFT)
## Documentation
- Class name: `BatchAlign`
- Category: `image/filters`
- Output node: `False`

The `BatchAlign` node is designed to align multiple batches of data, ensuring consistency and uniformity across different sets of inputs. It focuses on adjusting the alignment of data batches to facilitate more coherent processing or analysis downstream.
## Input types
### Required
- **`images`**
    - The images to be aligned, typically involving multiple frames or batches that require alignment for further processing.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`ref_frame`**
    - A reference frame or image against which other images are aligned. This serves as the baseline for alignment adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `torch.Tensor`
- **`direction`**
    - Specifies the direction of alignment, potentially influencing how images are adjusted relative to the reference frame.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`blur`**
    - Determines the level of blur applied during the alignment process, affecting the smoothness or sharpness of the aligned images.
    - Comfy dtype: `INT`
    - Python dtype: `float`
## Output types
- **`aligned`**
    - Comfy dtype: `IMAGE`
    - The result of aligning the input images, producing a coherent set of images aligned with the reference frame.
    - Python dtype: `torch.Tensor`
- **`flow`**
    - Comfy dtype: `IMAGE`
    - A flow field or map indicating the transformation applied to each image for alignment, useful for understanding the alignment process.
    - Python dtype: `torch.Tensor`
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

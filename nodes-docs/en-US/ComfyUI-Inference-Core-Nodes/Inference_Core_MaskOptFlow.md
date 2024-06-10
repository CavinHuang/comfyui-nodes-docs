---
tags:
- OpticalFlow
---

# [Inference.Core] Mask Optical Flow (DragNUWA)
## Documentation
- Class name: `Inference_Core_MaskOptFlow`
- Category: `ControlNet Preprocessors/Optical Flow`
- Output node: `False`

The node 'Inference_Core_MaskOptFlow' is designed to process optical flow data by applying a mask to it, effectively filtering the optical flow based on the provided mask. This preprocessing step is crucial for tasks that require focused analysis on specific regions of the optical flow, enhancing the accuracy and relevance of the flow data for subsequent processing stages.
## Input types
### Required
- **`optical_flow`**
    - The 'optical_flow' parameter represents the optical flow data to be processed. It is essential for determining the motion between two images or frames.
    - Comfy dtype: `OPTICAL_FLOW`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - The 'mask' parameter is used to specify the regions of interest within the optical flow data. It plays a critical role in filtering and refining the flow data for targeted analysis.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`OPTICAL_FLOW`**
    - Comfy dtype: `OPTICAL_FLOW`
    - The modified optical flow data, filtered through the applied mask, ready for further analysis or processing.
    - Python dtype: `torch.Tensor`
- **`PREVIEW_IMAGE`**
    - Comfy dtype: `IMAGE`
    - A visual representation of the masked optical flow, providing a preview of the effect of the mask on the flow data.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskOptFlow:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": dict(optical_flow=("OPTICAL_FLOW",), mask=("MASK",))
        }
    
    RETURN_TYPES = ("OPTICAL_FLOW", "IMAGE")
    RETURN_NAMES = ("OPTICAL_FLOW", "PREVIEW_IMAGE")
    FUNCTION = "mask_opt_flow"

    CATEGORY = "ControlNet Preprocessors/Optical Flow"
    
    def mask_opt_flow(self, optical_flow, mask):
        from controlnet_aux.unimatch import flow_to_image
        assert len(mask) >= len(optical_flow), f"Not enough masks to mask optical flow: {len(mask)} vs {len(optical_flow)}"
        mask = mask[:optical_flow.shape[0]]
        mask = F.interpolate(mask, optical_flow.shape[1:3])
        mask = rearrange(mask, "n 1 h w -> n h w 1")
        vis_flows = torch.stack([torch.from_numpy(flow_to_image(flow)).float() / 255. for flow in optical_flow.numpy()], dim=0)
        vis_flows *= mask
        optical_flow *= mask
        return (optical_flow, vis_flows)

```

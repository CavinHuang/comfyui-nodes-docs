
# Documentation
- Class name: Inference_Core_MaskOptFlow
- Category: ControlNet Preprocessors/Optical Flow
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Inference_Core_MaskOptFlow节点专为处理光流数据而设计，通过对光流应用蒙版来实现。这一预处理步骤对于需要聚焦分析光流特定区域的任务至关重要，能够提升后续处理阶段中光流数据的准确性和相关性。

# Input types
## Required
- optical_flow
    - optical_flow参数代表待处理的光流数据。它对于确定两幅图像或帧之间的运动至关重要。
    - Comfy dtype: OPTICAL_FLOW
    - Python dtype: torch.Tensor
- mask
    - mask参数用于指定光流数据中的感兴趣区域。它在过滤和优化用于目标分析的流数据方面发挥着关键作用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- OPTICAL_FLOW
    - 经过蒙版过滤的修改后的光流数据，可用于进一步分析或处理。
    - Comfy dtype: OPTICAL_FLOW
    - Python dtype: torch.Tensor
- PREVIEW_IMAGE
    - 蒙版光流的可视化表示，提供了蒙版对流数据影响的预览。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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

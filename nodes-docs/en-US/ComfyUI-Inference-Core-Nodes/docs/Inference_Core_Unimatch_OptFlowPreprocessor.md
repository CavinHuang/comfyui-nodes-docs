---
tags:
- OpticalFlow
---

# [Inference.Core] Unimatch Optical Flow
## Documentation
- Class name: `Inference_Core_Unimatch_OptFlowPreprocessor`
- Category: `ControlNet Preprocessors/Optical Flow`
- Output node: `False`

This node is designed for preprocessing optical flow data, specifically for enhancing and refining flow estimations through techniques such as upscaling, masking, and applying attention mechanisms. It leverages the Unimatch algorithm to process and improve the quality of optical flow predictions, making it suitable for tasks that require precise motion analysis between video frames.
## Input types
### Required
- **`image`**
    - The sequence of images for which optical flow needs to be estimated. This input is crucial for the node's operation as it directly influences the accuracy and quality of the flow predictions.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`ckpt_name`**
    - The name of the checkpoint file for the Unimatch model. This determines the specific pre-trained model version used for flow estimation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`backward_flow`**
    - A boolean flag indicating whether to estimate the backward optical flow. This affects the directionality of the flow estimation.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`bidirectional_flow`**
    - A boolean flag indicating whether to estimate bidirectional optical flow, enhancing motion analysis by considering both forward and backward flows.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`OPTICAL_FLOW`**
    - Comfy dtype: `OPTICAL_FLOW`
    - The enhanced optical flow predictions, processed through the Unimatch algorithm to provide refined motion estimations between video frames.
    - Python dtype: `torch.Tensor`
- **`PREVIEW_IMAGE`**
    - Comfy dtype: `IMAGE`
    - A visualization of the optical flow predictions, offering a visual representation of the motion between frames for easier interpretation and analysis.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Unimatch_OptFlowPreprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": dict(
                image=("IMAGE",),
                ckpt_name=(
                    ["gmflow-scale1-mixdata.pth", "gmflow-scale2-mixdata.pth", "gmflow-scale2-regrefine6-mixdata.pth"],
                    {"default": "gmflow-scale2-regrefine6-mixdata.pth"}
                ),
                backward_flow=("BOOLEAN", {"default": False}),
                bidirectional_flow=("BOOLEAN", {"default": False})
            )
        }

    RETURN_TYPES = ("OPTICAL_FLOW", "IMAGE")
    RETURN_NAMES = ("OPTICAL_FLOW", "PREVIEW_IMAGE")
    FUNCTION = "estimate"

    CATEGORY = "ControlNet Preprocessors/Optical Flow"

    def estimate(self, image, ckpt_name, backward_flow=False, bidirectional_flow=False):
        assert len(image) > 1, "[Unimatch] Requiring as least two frames as a optical flow estimator. Only use this node on video input."    
        from controlnet_aux.unimatch import UnimatchDetector
        tensor_images = image
        model = UnimatchDetector.from_pretrained(filename=ckpt_name).to(model_management.get_torch_device())
        flows, vis_flows = [], []
        for i in range(len(tensor_images) - 1):
            image0, image1 = np.asarray(image[i:i+2].cpu() * 255., dtype=np.uint8)
            flow, vis_flow = model(image0, image1, output_type="np", pred_bwd_flow=backward_flow, pred_bidir_flow=bidirectional_flow)
            flows.append(torch.from_numpy(flow).float())
            vis_flows.append(torch.from_numpy(vis_flow).float() / 255.)
        del model
        return (torch.stack(flows, dim=0), torch.stack(vis_flows, dim=0))

```

---
tags:
- OpticalFlow
---

# Unimatch Optical Flow
## Documentation
- Class name: `Unimatch_OptFlowPreprocessor`
- Category: `ControlNet Preprocessors/Optical Flow`
- Output node: `False`

This node is designed to preprocess optical flow data for further processing or analysis, specifically within the context of Unimatch, a system for estimating and manipulating optical flows in video sequences. It abstracts the complexities involved in preparing optical flow data, ensuring it is in the correct format and resolution for Unimatch's algorithms to operate effectively.
## Input types
### Required
- **`image`**
    - The sequence of images to be processed for optical flow estimation. This input is essential for generating optical flow data between consecutive frames in a video sequence, serving as the foundation for flow analysis or manipulation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`ckpt_name`**
    - The name of the checkpoint file for the Unimatch model. This parameter allows for the selection of specific pre-trained models, influencing the accuracy and quality of the optical flow estimation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`backward_flow`**
    - A boolean flag indicating whether to estimate the backward optical flow. This option enables bidirectional flow estimation, enhancing the analysis of motion between frames.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`bidirectional_flow`**
    - A boolean flag indicating whether to estimate bidirectional flow. This enhances the motion analysis by considering both forward and backward movements between frames.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`OPTICAL_FLOW`**
    - Comfy dtype: `OPTICAL_FLOW`
    - The preprocessed optical flow data, ready for further analysis or visualization. This output is optimized for accuracy and efficiency in subsequent processing steps.
    - Python dtype: `torch.Tensor`
- **`PREVIEW_IMAGE`**
    - Comfy dtype: `IMAGE`
    - A visual representation of the optical flow data, often used for previewing the motion or for debugging purposes. This image can help in understanding the flow's characteristics and in verifying the preprocessing's effectiveness.
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

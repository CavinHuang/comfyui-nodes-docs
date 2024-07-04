
# Documentation
- Class name: Inference_Core_Unimatch_OptFlowPreprocessor
- Category: ControlNet Preprocessors/Optical Flow
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

本节点专为预处理光流数据而设计，特别注重通过上采样、遮罩和应用注意力机制等技术来增强和优化流估计。它利用Unimatch算法来处理和提高光流预测的质量，使其适用于需要在视频帧之间进行精确运动分析的任务。

# Input types
## Required
- image
    - 需要估计光流的图像序列。这一输入对节点的运作至关重要，因为它直接影响流预测的准确性和质量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- ckpt_name
    - Unimatch模型的检查点文件名。这决定了用于流估计的特定预训练模型版本。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- backward_flow
    - 一个布尔标志，指示是否估计反向光流。这影响流估计的方向性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- bidirectional_flow
    - 一个布尔标志，指示是否估计双向光流，通过同时考虑正向和反向流来增强运动分析。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- OPTICAL_FLOW
    - 经过Unimatch算法处理的增强光流预测，提供视频帧之间精细的运动估计。
    - Comfy dtype: OPTICAL_FLOW
    - Python dtype: torch.Tensor
- PREVIEW_IMAGE
    - 光流预测的可视化，提供帧间运动的视觉表示，便于解释和分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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

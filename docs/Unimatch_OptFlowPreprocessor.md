
# Documentation
- Class name: Unimatch_OptFlowPreprocessor
- Category: ControlNet Preprocessors/Optical Flow
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点专门用于处理光流数据，为后续的处理或分析做准备，特别是在Unimatch系统的上下文中。Unimatch是一个用于估计和操作视频序列中光流的系统。这个节点抽象了准备光流数据过程中涉及的复杂性，确保数据格式和分辨率适合Unimatch算法的有效操作。

# Input types
## Required
- image
    - 需要处理以估计光流的图像序列。这个输入对于在视频序列的连续帧之间生成光流数据至关重要，是进行流分析或操作的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- ckpt_name
    - Unimatch模型的检查点文件名。此参数允许选择特定的预训练模型，影响光流估计的准确性和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- backward_flow
    - 一个布尔标志，指示是否估计反向光流。此选项启用双向流估计，增强了帧间运动的分析。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- bidirectional_flow
    - 一个布尔标志，指示是否估计双向流。这通过考虑帧之间的前向和后向运动来增强运动分析。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- OPTICAL_FLOW
    - 经过预处理的光流数据，可用于进一步分析或可视化。这个输出针对后续处理步骤的准确性和效率进行了优化。
    - Comfy dtype: OPTICAL_FLOW
    - Python dtype: torch.Tensor
- PREVIEW_IMAGE
    - 光流数据的可视化表示，通常用于预览运动或调试目的。这个图像可以帮助理解流的特征，并验证预处理的有效性。
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

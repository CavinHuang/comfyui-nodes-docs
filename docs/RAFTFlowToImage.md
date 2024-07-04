
# Documentation
- Class name: RAFTFlowToImage
- Category: jamesWalker55
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

RAFTFlowToImage节点的主要功能是将光流数据转换为图像。这一过程涉及将表示两帧之间运动的流数据转化为可视化格式，便于解释或进一步处理。该节点在计算机视觉领域中扮演着重要角色，特别是在运动分析和视频处理任务中。通过将复杂的光流数据转换为直观的图像表示，RAFTFlowToImage节点有助于研究人员和开发者更好地理解和分析视频序列中的运动模式。

# Input types
## Required
- raft_flow
    - raft_flow输入是一个表示光流数据的张量。这些数据对于生成两帧之间捕捉到的运动的相应图像表示至关重要。光流数据包含了像素级别的运动信息，RAFTFlowToImage节点将利用这些信息创建可视化结果。
    - Comfy dtype: RAFT_FLOW
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出是光流数据的图像表示。这个图像直观地展示了两帧之间的运动，以一种易于解释和进一步处理的格式呈现。通过颜色编码和强度变化，该图像能够有效地传达运动的方向和幅度，为后续的分析和应用提供了宝贵的视觉信息。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
@register_node("RAFTEstimate", "RAFT Estimate")
class _:
    """
    https://pytorch.org/vision/main/auto_examples/plot_optical_flow.html
    """

    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "image_a": ("IMAGE",),
            "image_b": ("IMAGE",),
        }
    }
    RETURN_TYPES = ("RAFT_FLOW",)
    FUNCTION = "execute"

    def execute(self, image_a: torch.Tensor, image_b: torch.Tensor):
        """
        Code derived from:
        https://pytorch.org/vision/main/auto_examples/plot_optical_flow.html
        """

        assert isinstance(image_a, torch.Tensor)
        assert isinstance(image_b, torch.Tensor)

        torch_device = model_management.get_torch_device()
        offload_device = model_management.unet_offload_device()

        image_a = comfyui_to_native_torch(image_a).to(torch_device)
        image_b = comfyui_to_native_torch(image_b).to(torch_device)
        model = load_model().to(torch_device)

        image_a = preprocess_image(image_a)
        image_b = preprocess_image(image_b)

        all_flows = model(image_a, image_b)
        best_flow = all_flows[-1]
        # best_flow.shape => torch.Size([1, 2, 512, 512])

        model.to(offload_device)
        image_a = image_a.to("cpu")
        image_b = image_b.to("cpu")
        best_flow = best_flow.to("cpu")

        return (best_flow,)

```


# Documentation
- Class name: RAFTLoadFlowFromEXRChannels
- Category: jamesWalker55
- Output node: False

本节点专门用于从EXR图像文件中加载运动流，特别适用于Blender的Cycles渲染器中的矢量通道。它通过读取EXR文件中指定的通道来提取运动向量，允许在后续处理或可视化任务中操作和使用这些向量。

# Input types
## Required
- path
    - 指定要加载运动流的EXR图像文件路径。此路径至关重要，因为它指向了处理所需的源图像。
    - Comfy dtype: STRING
    - Python dtype: str
- x_channel
    - 确定用于运动流x分量的EXR图像通道（R、G、B、A）。通道的选择影响了x轴方向上运动的解释方式。
    - Comfy dtype: ['R', 'G', 'B', 'A']
    - Python dtype: str
- y_channel
    - 确定用于运动流y分量的EXR图像通道（R、G、B、A）。通道的选择影响了y轴方向上运动的解释方式。
    - Comfy dtype: ['R', 'G', 'B', 'A']
    - Python dtype: str
- invert_x
    - 布尔标志，表示是否沿x轴反转运动流。可用于在必要时调整运动方向。
    - Comfy dtype: ['false', 'true']
    - Python dtype: bool
- invert_y
    - 布尔标志，表示是否沿y轴反转运动流。可用于在必要时调整运动方向。
    - Comfy dtype: ['false', 'true']
    - Python dtype: bool

# Output types
- raft_flow
    - 输出是一个张量，表示从指定的EXR通道中提取的运动流。这个流可用于进一步的运动分析或可视化。
    - Comfy dtype: RAFT_FLOW
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
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

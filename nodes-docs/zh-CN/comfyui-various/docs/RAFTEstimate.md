
# Documentation
- Class name: RAFTEstimate
- Category: jamesWalker55
- Output node: False

RAFTEstimate节点旨在使用RAFT算法估算两幅图像之间的光流。它抽象了光流计算的复杂性，提供了一种简单直接的方法来获取描述连续图像间物体表观运动的运动向量。

# Input types
## Required
- image_a
    - 用于计算光流的序列中的第一张图像。它作为参考帧，用于测量运动。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image_b
    - 序列中紧随'image_a'之后的第二张图像。它与第一张图像进行比较以估算运动向量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- raft_flow
    - 以张量形式表示的估算光流。它封装了两个输入图像之间的运动向量。
    - Comfy dtype: RAFT_FLOW
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

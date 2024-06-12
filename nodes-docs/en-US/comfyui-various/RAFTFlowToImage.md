---
tags:
- OpticalFlow
---

# RAFT Flow to Image
## Documentation
- Class name: `RAFTFlowToImage`
- Category: `jamesWalker55`
- Output node: `False`

The RAFTFlowToImage node is designed to convert optical flow data into images. This process involves transforming the flow data, which represents motion between two frames, into a visual format that can be easily interpreted or further processed.
## Input types
### Required
- **`raft_flow`**
    - The 'raft_flow' input is a tensor representing the optical flow data. This data is crucial for generating the corresponding image representation of the motion captured between two frames.
    - Comfy dtype: `RAFT_FLOW`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image representation of the optical flow data. This image visualizes the motion between two frames in a format that can be easily interpreted or further processed.
    - Python dtype: `torch.Tensor`
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

---
tags:
- OpticalFlow
---

# RAFT Load Flow from EXR Channels
## Documentation
- Class name: `RAFTLoadFlowFromEXRChannels`
- Category: `jamesWalker55`
- Output node: `False`

This node is designed for loading motion flows from EXR image files, specifically tailored for use with Blender's vector pass in the Cycles renderer. It extracts motion vectors by reading specified channels from an EXR file, allowing for the manipulation and use of these vectors in downstream processing or visualization tasks.
## Input types
### Required
- **`path`**
    - Specifies the file path to the EXR image from which motion flows are to be loaded. This path is crucial as it directs the node to the source image for processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`x_channel`**
    - Determines the EXR image channel (R, G, B, A) to be used for the x-component of the motion flow. The choice of channel affects how motion is interpreted along the x-axis.
    - Comfy dtype: `['R', 'G', 'B', 'A']`
    - Python dtype: `str`
- **`y_channel`**
    - Determines the EXR image channel (R, G, B, A) to be used for the y-component of the motion flow. The choice of channel affects how motion is interpreted along the y-axis.
    - Comfy dtype: `['R', 'G', 'B', 'A']`
    - Python dtype: `str`
- **`invert_x`**
    - A boolean flag indicating whether to invert the motion flow along the x-axis. This can be used to adjust the direction of motion if necessary.
    - Comfy dtype: `['false', 'true']`
    - Python dtype: `bool`
- **`invert_y`**
    - A boolean flag indicating whether to invert the motion flow along the y-axis. This can be used to adjust the direction of motion if necessary.
    - Comfy dtype: `['false', 'true']`
    - Python dtype: `bool`
## Output types
- **`raft_flow`**
    - Comfy dtype: `RAFT_FLOW`
    - The output is a tensor representing the motion flow extracted from the specified EXR channels. This flow can be used for further motion analysis or visualization.
    - Python dtype: `torch.Tensor`
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

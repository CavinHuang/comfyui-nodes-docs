---
tags:
- Animation
- CameraControl
---

# Motion Data Visualizer
## Documentation
- Class name: `MotionDataVisualizer`
- Category: `MotionDiff`
- Output node: `False`

The MotionDataVisualizer node is designed to transform motion data into a visual representation, allowing for the visualization of motion through various parameters such as distance, elevation, and rotation. It supports different visualization styles and outputs the visualized motion as a sequence of tensor frames.
## Input types
### Required
- **`motion_data`**
    - The motion data to be visualized, which can include joints information or require conversion from motion format to joints. This input is crucial as it directly influences the visual output by determining the motion's structure and dynamics to be visualized.
    - Comfy dtype: `MOTION_DATA`
    - Python dtype: `Dict[str, Any]`
- **`visualization`**
    - Specifies the style of visualization to be applied to the motion data, affecting the visual appearance and interpretability of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`distance`**
    - The distance parameter controls the camera distance from the motion in the visualization, impacting the scale and perspective of the visualized motion.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`elevation`**
    - The elevation parameter adjusts the camera elevation angle for the visualization, influencing the vertical angle and overall view of the motion.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rotation`**
    - The rotation parameter sets the camera rotation angle around the motion in the visualization, affecting the orientation and angle of the visualized motion.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`poselinewidth`**
    - Defines the line width for the pose representation in the visualization, impacting the clarity and visual prominence of the motion's pose.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`opt_title`**
    - An optional title for the visualization, which can enhance the context or provide additional information for the visualized motion.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The visualized motion output as an image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MotionDataVisualizer:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "motion_data": ("MOTION_DATA", ),
                "visualization": (["original", "pseudo-openpose"], {"default": "pseudo-openpose"}),
                "distance": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 10.0, "step": 0.1}),
                "elevation": ("FLOAT", {"default": 120, "min": 0.0, "max": 300.0, "step": 0.1}),
                "rotation": ("FLOAT", {"default": -90, "min": -180, "max": 180, "step": 1}),
                "poselinewidth": ("FLOAT", {"default": 4, "min": 0, "max": 50, "step": 0.1}),
            },
            "optional": {
                "opt_title": ("STRING", {"default": '' ,"multiline": False}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "MotionDiff"
    FUNCTION = "visualize"

    def visualize(self, motion_data, visualization, distance, elevation, rotation, poselinewidth, opt_title=None):
        if "joints" in motion_data:
            joints = motion_data["joints"]
        else:
            joints = motion_data_to_joints(motion_data["motion"])
        pil_frames = plot_3d_motion(
            None, t2m_kinematic_chain, joints, distance, elevation, rotation, poselinewidth,
            title=opt_title if opt_title is not None else '',
            fps=1,  save_as_pil_lists=True, visualization=visualization
        )
        tensor_frames = []
        for pil_image in pil_frames:
            np_image = np.array(pil_image.convert("RGB")).astype(np.float32) / 255.0
            tensor_frames.append(torch.from_numpy(np_image))
        return (torch.stack(tensor_frames, dim=0), )

```

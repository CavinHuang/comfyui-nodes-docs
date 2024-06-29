---
tags:
- SMPL
- SMPLModel
---

# Render SMPL Mesh
## Documentation
- Class name: `RenderSMPLMesh`
- Category: `MotionDiff/smpl`
- Output node: `False`

This node is designed to render 3D meshes of human figures based on the SMPL model. It focuses on generating visual representations from SMPL parameters, enabling the visualization of human poses and shapes in a 3D environment.
## Input types
### Required
- **`smpl`**
    - The SMPL model parameters required for rendering the 3D mesh. This input is crucial for determining the pose and shape of the human figure to be visualized.
    - Comfy dtype: `SMPL`
    - Python dtype: `torch.Tensor`
- **`draw_platform`**
    - Specifies whether to draw a platform in the rendered image, affecting the visual context of the 3D mesh.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`depth_only`**
    - Determines if only the depth map should be rendered, omitting the visual representation of the 3D mesh.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`yfov`**
    - The field of view in the y-axis for the camera, influencing the perspective from which the mesh is rendered.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`move_x`**
    - Horizontal movement of the camera, allowing for lateral adjustments in the rendering perspective.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`move_y`**
    - Vertical movement of the camera, enabling adjustments in the vertical positioning of the rendering perspective.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`move_z`**
    - Depth movement of the camera, affecting the distance between the camera and the 3D mesh.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rotate_x`**
    - Rotation of the camera around the x-axis, altering the tilt of the rendered image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rotate_y`**
    - Rotation of the camera around the y-axis, changing the yaw of the rendered perspective.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rotate_z`**
    - Rotation of the camera around the z-axis, modifying the roll of the rendering perspective.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`background_hex_color`**
    - The background color of the rendered image, specified as a hexadecimal color code.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`frame_width`**
    - The width of the frame for the rendered image, defining the horizontal resolution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frame_height`**
    - The height of the frame for the rendered image, defining the vertical resolution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`normals`**
    - Indicates whether normals should be included in the rendering, affecting the visual texture and lighting of the 3D mesh.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The output is a visual representation (image) of the 3D mesh rendered from the SMPL parameters. This image showcases the human figure in various poses and shapes.
    - Python dtype: `torch.Tensor`
- **`DEPTH_MAP`**
    - Comfy dtype: `IMAGE`
    - The depth map of the rendered 3D mesh, providing spatial depth information for each pixel in the image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RenderSMPLMesh:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "smpl": ("SMPL", ),
                "draw_platform": ("BOOLEAN", {"default": False}),
                "depth_only": ("BOOLEAN", {"default": False}),
                "yfov": ("FLOAT", {"default": 0.6, "min": 0.1, "max": 10, "step": 0.01}),
                "move_x": ("FLOAT", {"default": 0,"min": -500, "max": 500, "step": 0.01}),
                "move_y": ("FLOAT", {"default": -0.1,"min": -500, "max": 500, "step": 0.01}),
                "move_z": ("FLOAT", {"default": 0,"min": -500, "max": 500, "step": 0.01}),
                "rotate_x": ("FLOAT", {"default": 0,"min": -180, "max": 180, "step": 0.1}),
                "rotate_y": ("FLOAT", {"default": 0,"min": -180, "max": 180, "step": 0.1}),
                "rotate_z": ("FLOAT", {"default": 0,"min": -180, "max": 180, "step": 0.1}),
                "background_hex_color": ("STRING", {"default": "#000000", "mutiline": False}),
                "frame_width": ("INT", {"default": 512, "min": 64, "max": 4096, "step": 8}),
                "frame_height": ("INT", {"default": 512, "min": 64, "max": 4096, "step": 8}),
            },
            "optional": {
                "normals": ("BOOLEAN", {"default": False}),
            }
        }

    RETURN_TYPES = ("IMAGE", "IMAGE", "MASK")
    RETURN_NAMES = ("IMAGE", "DEPTH_MAP")
    CATEGORY = "MotionDiff/smpl"
    FUNCTION = "render"
    def render(self, smpl, yfov, move_x, move_y, move_z, rotate_x, rotate_y, rotate_z, frame_width, frame_height, draw_platform, depth_only, background_hex_color, normals=False):
        smpl_model_path, thetas, meta = smpl
        color_frames, depth_frames = render_from_smpl(
            thetas.to(get_torch_device()),
            yfov, move_x, move_y, move_z, rotate_x, rotate_y, rotate_z, frame_width, frame_height, draw_platform,depth_only, normals,
            smpl_model_path=smpl_model_path, shape_parameters=smpl[2].get("shape_parameters", None),
            normalized_to_vertices=meta.get("normalized_to_vertices", False)
        )
        bg_color = ImageColor.getcolor(background_hex_color, "RGB")
        color_frames = torch.from_numpy(color_frames[..., :3].astype(np.float32) / 255.)
        white_mask = [
            (color_frames[..., 0] == 1.) & 
            (color_frames[..., 1] == 1.) & 
            (color_frames[..., 2] == 1.)
        ]
        color_frames[..., :3][white_mask] = torch.Tensor(bg_color)
        white_mask_tensor = torch.stack(white_mask, dim=0)
        white_mask_tensor = white_mask_tensor.float() / white_mask_tensor.max()
        white_mask_tensor = 1.0 - white_mask_tensor.permute(1, 2, 3, 0).squeeze(dim=-1)
        #Normalize to [0, 1]
        normalized_depth = (depth_frames - depth_frames.min()) / (depth_frames.max() - depth_frames.min())
        #Pyrender's depths are the distance in meters to the camera, which is the inverse of depths in normal context
        #Ref: https://github.com/mmatl/pyrender/issues/10#issuecomment-468995891
        normalized_depth[normalized_depth != 0] = 1 - normalized_depth[normalized_depth != 0]
        #https://github.com/Fannovel16/comfyui_controlnet_aux/blob/main/src/controlnet_aux/util.py#L24
        depth_frames = [torch.from_numpy(np.concatenate([x, x, x], axis=2)) for x in normalized_depth[..., None]]
        depth_frames = torch.stack(depth_frames, dim=0)
        return (color_frames, depth_frames, white_mask_tensor,)

```

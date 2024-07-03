
# Documentation
- Class name: RenderMultipleSubjectsSMPLMesh
- Category: MotionDiff/smpl
- Output node: False

该节点旨在渲染场景中的多个SMPL网格主体。它利用3D网格渲染技术同时可视化多个主体的运动和形态，提供了它们空间交互和动态的全面视图。

# Input types
## Required
- smpl_multi_subjects
    - 这个输入对渲染至关重要，因为它包含了多个主体的SMPL模型，包括它们的网格数据和可能的运动信息。这个数据集使节点能够准确地可视化场景中的每个主体。
    - Comfy dtype: SMPL_MULTIPLE_SUBJECTS
    - Python dtype: List[Dict[str, Union[np.ndarray, List[np.ndarray]]]]
- draw_platform
    - 指定是否为主体绘制一个站立平台，以增强可视化的真实感。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- depth_only
    - 决定是否仅渲染场景的深度图，这对某些类型的视觉分析可能很有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- fx_offset
    - 相机焦点的水平偏移，允许调整渲染场景的透视效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- fy_offset
    - 相机焦点的垂直偏移，允许微调场景的视觉透视效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- move_x
    - 沿x轴移动相机，提供对场景构图的控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- move_y
    - 沿y轴移动相机，允许调整场景的取景范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- move_z
    - 沿z轴移动相机，提供改变场景深度的能力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rotate_x
    - 围绕x轴旋转相机，使场景的垂直方向发生变化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rotate_y
    - 围绕y轴旋转相机，允许改变场景的水平方向。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rotate_z
    - 围绕z轴旋转相机，提供调整场景旋转透视的可能性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- background_hex_color
    - 使用十六进制颜色代码设置场景的背景颜色，增强视觉吸引力。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- normals
    - 决定是否渲染网格的法线，这可以为视觉分析提供额外的细节。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- remove_background
    - 指定是否从渲染的场景中移除背景，使可视化仅聚焦于主体。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- IMAGE
    - Comfy dtype: IMAGE
    - 输出是多个SMPL模型的视觉表示，在场景中渲染为网格。它提供了主体形态和运动的详细视图。
    - Python dtype: np.ndarray
- DEPTH_MAP
    - Comfy dtype: IMAGE
    - 渲染场景的深度图，提供主体之间空间关系和距离的洞察。
    - Python dtype: np.ndarray


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RenderMultipleSubjectsSMPLMesh:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "smpl_multi_subjects": ("SMPL_MULTIPLE_SUBJECTS", ),
                "draw_platform": ("BOOLEAN", {"default": False}),
                "depth_only": ("BOOLEAN", {"default": False}),
                "fx_offset": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 10000, "step": 0.01}),
                "fy_offset": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 10000, "step": 0.01}),
                "move_x": ("FLOAT", {"default": 0,"min": -500, "max": 500, "step": 0.01}),
                "move_y": ("FLOAT", {"default": 0,"min": -500, "max": 500, "step": 0.01}),
                "move_z": ("FLOAT", {"default": 0,"min": -500, "max": 500, "step": 0.01}),
                "rotate_x": ("FLOAT", {"default": 0,"min": -180, "max": 180, "step": 0.1}),
                "rotate_y": ("FLOAT", {"default": 0,"min": -180, "max": 180, "step": 0.1}),
                "rotate_z": ("FLOAT", {"default": 0,"min": -180, "max": 180, "step": 0.1}),
                "background_hex_color": ("STRING", {"default": "#000000", "mutiline": False}),
            },
            "optional": {
                "normals": ("BOOLEAN", {"default": False}),
                "remove_background": ("BOOLEAN", {"default": True})
            }
        }

    RETURN_TYPES = ("IMAGE", "IMAGE", "MASK")
    RETURN_NAMES = ("IMAGE", "DEPTH_MAP")
    CATEGORY = "MotionDiff/smpl"
    FUNCTION = "render"
    def render(self, smpl_multi_subjects, fx_offset, fy_offset, move_x, move_y, move_z, rotate_x, rotate_y, rotate_z, draw_platform, depth_only, background_hex_color, normals=False, remove_background=True):
        verts_frames, meta = smpl_multi_subjects
        color_frames, depth_frames = render_from_smpl_multiple_subjects(
            verts_frames, meta["faces"], meta["focal_length"],
            fx_offset, fy_offset, move_x, move_y, move_z, rotate_x, rotate_y, rotate_z, meta["frame_width"], meta["frame_height"], draw_platform,depth_only, normals,
            cx=meta.get('cx', meta["frame_width"] / 2), cy=meta.get('cy', meta["frame_height"] / 2),
            vertical_flip=meta.get("vertical_flip", True)
        )
        bg_color = ImageColor.getcolor(background_hex_color, "RGB")
        color_frames = torch.from_numpy(color_frames[..., :3].astype(np.float32) / 255.)
        white_mask = [
            (color_frames[..., 0] == 1.) & 
            (color_frames[..., 1] == 1.) & 
            (color_frames[..., 2] == 1.)
        ]
        if remove_background:
            color_frames[..., :3][white_mask] = torch.Tensor(bg_color)
        elif normals:
            color_frames[..., :3][white_mask] = torch.Tensor([128, 128, 255]).float() / 255.
        white_mask_tensor = torch.stack(white_mask, dim=0)
        white_mask_tensor = white_mask_tensor.float() / white_mask_tensor.max()
        white_mask_tensor = 1.0 - white_mask_tensor.permute(1, 2, 3, 0).squeeze(dim=-1)
        #Normalize to [0, 1]
        #For some reason this is already inversed depth???
        normalized_depth = (depth_frames - depth_frames.min()) / (depth_frames.max() - depth_frames.min())
        #https://github.com/Fannovel16/comfyui_controlnet_aux/blob/main/src/controlnet_aux/util.py#L24
        depth_frames = [torch.from_numpy(np.concatenate([x, x, x], axis=2)) for x in normalized_depth[..., None]]
        depth_frames = torch.stack(depth_frames, dim=0)
        return (color_frames, depth_frames, white_mask_tensor,)

```

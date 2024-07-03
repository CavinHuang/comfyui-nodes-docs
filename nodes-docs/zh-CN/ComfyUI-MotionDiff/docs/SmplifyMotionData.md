
# Documentation
- Class name: SmplifyMotionData
- Category: MotionDiff/smpl
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SmplifyMotionData节点旨在将运动数据转换为与SMPL模型兼容的格式，通过迭代过程优化人体运动的表示。这种转换有助于在需要3D人体模型的应用中使用运动数据，如动画和模拟。

# Input types
## Required
- motion_data
    - 需要转换的输入运动数据。这些数据对于使用SMPL模型生成人体运动的3D表示至关重要。
    - Comfy dtype: MOTION_DATA
    - Python dtype: Dict[str, Union[np.ndarray, Dict[str, np.ndarray]]]
- num_smplify_iters
    - 指定SMPLify算法的迭代次数，影响运动转换的精度和细节。
    - Comfy dtype: INT
    - Python dtype: int
- smplify_step_size
    - 确定SMPLify算法的步长，影响运动表示的收敛速度和精度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- smpl_model
    - 用于运动转换的特定SMPL模型，决定生成的3D人体模型的性别和身体比例。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- smpl
    - 输出包括所使用的SMPL模型的路径、表示3D人体模型在各帧中姿势的SMPL模型参数，以及与转换过程相关的元数据。
    - Comfy dtype: SMPL
    - Python dtype: Tuple[str, torch.Tensor, Dict[str, torch.Tensor]]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SmplifyMotionData:
    @classmethod
    def INPUT_TYPES(s):
        global smpl_model_dicts
        smpl_model_dicts = get_smpl_models_dict()
        return {
            "required": {
                "motion_data": ("MOTION_DATA", ),
                "num_smplify_iters": ("INT", {"min": 1, "max": 1000, "default": 20}),
                "smplify_step_size": ("FLOAT", {"min": 1e-4, "max": 5e-1, "step": 1e-4, "default": 1e-1}),
                "smpl_model": (list(smpl_model_dicts.keys()), {"default": "SMPL_NEUTRAL.pkl"})
            }
        }

    RETURN_TYPES = ("SMPL",)
    CATEGORY = "MotionDiff/smpl"
    FUNCTION = "convent"
    
    def convent(self, motion_data, num_smplify_iters, smplify_step_size, smpl_model):
        global smpl_model_dicts
        if smpl_model_dicts is None:
            smpl_model_dicts = get_smpl_models_dict()
        smpl_model_path = smpl_model_dicts[smpl_model]
        if "joints" in motion_data:
            joints = motion_data["joints"]
        else:
            joints = motion_data_to_joints(motion_data["motion"])
        with torch.inference_mode(False):
            convention = joints2smpl(
                num_frames=joints.shape[0], 
                device=get_torch_device(), 
                num_smplify_iters=num_smplify_iters, 
                smplify_step_size=smplify_step_size,
                smpl_model_path = smpl_model_path
            )
            thetas, meta = convention.joint2smpl(joints)
        thetas = thetas.cpu().detach()
        for key in meta:
            meta[key] = meta[key].cpu().detach()
        gc.collect()
        soft_empty_cache()
        return ((smpl_model_path, thetas, meta), ) #thetas after normalized to vertices is 1N3B with N, B being number of vertices and number of frames respectively

```

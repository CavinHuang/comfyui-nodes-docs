---
tags:
- SMPLModel
---

# Smplify Motion Data
## Documentation
- Class name: `SmplifyMotionData`
- Category: `MotionDiff/smpl`
- Output node: `False`

The SmplifyMotionData node is designed to convert motion data into a format compatible with the SMPL model, utilizing an iterative process to refine the representation of human motion. This conversion facilitates the use of motion data in applications requiring 3D human models, such as animation and simulation.
## Input types
### Required
- **`motion_data`**
    - The input motion data to be converted. This data is essential for generating a 3D representation of human motion using the SMPL model.
    - Comfy dtype: `MOTION_DATA`
    - Python dtype: `Dict[str, Union[np.ndarray, Dict[str, np.ndarray]]]`
- **`num_smplify_iters`**
    - Specifies the number of iterations for the SMPLify algorithm, affecting the accuracy and detail of the motion conversion.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`smplify_step_size`**
    - Determines the step size for the SMPLify algorithm, influencing the convergence rate and precision of the motion representation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`smpl_model`**
    - The specific SMPL model to be used for motion conversion, dictating the gender and body proportions of the generated 3D human model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`smpl`**
    - Comfy dtype: `SMPL`
    - The output includes the path to the SMPL model used, the SMPL model parameters representing the pose of the 3D human model across frames, and metadata related to the conversion process.
    - Python dtype: `Tuple[str, torch.Tensor, Dict[str, torch.Tensor]]`
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

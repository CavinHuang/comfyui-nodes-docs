# Documentation
- Class name: MotionctrlCond
- Category: motionctrl
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-MotionCtrl.git

MotionctrlCond节点旨在管理和处理动态系统中的运动控制条件。它接受各种输入，如模型配置、文本提示、相机设置和轨迹数据，以生成一套全面的运动控制。该节点确保运动平稳并与提供的内容对齐，处理相机和对象运动推理模式。它输出调节信号、轨迹特征和其他相关运动参数，这些参数对于运动控制流水线中的后续步骤至关重要。

# Input types
## Required
- model
    - 模型参数对节点至关重要，因为它定义了节点将用于生成运动控制的底层运动控制模型。这是一个必需的输入，直接影响节点处理和产生准确运动控制输出的能力。
    - Comfy dtype: MOTIONCTRL
    - Python dtype: nn.Module
- prompt
    - 提示参数允许用户输入描述性文本，指导运动控制行为。它很重要，因为它为模型提供了生成与描述场景一致的运动的上下文。
    - Comfy dtype: STRING
    - Python dtype: str
- camera
    - 相机参数指定多帧环境中的相机设置。对于节点来说，正确对齐相机的视点与正在控制的运动至关重要，以确保一致的视觉输出。
    - Comfy dtype: STRING
    - Python dtype: str
- traj
    - 轨迹参数概述了运动控制应遵循的路径。它是一个关键输入，决定了运动的顺序，对于节点产生所需的运动模式是不可或缺的。
    - Comfy dtype: STRING
    - Python dtype: str
- infer_mode
    - 推理模式参数决定节点如何处理运动和相机控制。它在节点的操作中提供了灵活性，允许其适应不同的推理需求。
    - Comfy dtype: MODE
    - Python dtype: str
- context_overlap
    - 上下文重叠参数用于定义相机和轨迹对齐的重叠范围。它影响节点如何将先前的上下文集成到当前的运动控制序列中。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- positive
    - 正向调节输出提供一组信号，根据输入提示和设置将运动控制引向期望的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative
    - 负向调节输出用于抵消或抑制某些不希望出现的运动特征，确保运动与预期的上下文一致。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- traj_list
    - 轨迹列表输出枚举了定义运动路径的运动控制点序列。它对于可视化和执行计划的运动非常重要。
    - Comfy dtype: TRAJ_LIST
    - Python dtype: List[torch.Tensor]
- rt_list
    - RT列表输出包含与运动序列中每一帧对应的相机旋转和平移参数的列表。
    - Comfy dtype: RT_LIST
    - Python dtype: List[np.ndarray]
- traj
    - 轨迹特征输出表示处理后的运动控制数据，该数据封装了每一帧的运动特征。
    - Comfy dtype: TRAJ_FEATURES
    - Python dtype: torch.Tensor
- rt
    - RT输出提供了与当前帧的运动控制对齐的最终相机旋转和平移参数。
    - Comfy dtype: RT
    - Python dtype: torch.Tensor
- noise_shape
    - 噪声形状输出定义了应用于运动控制系统的噪声的维度，这对于某些类型的模拟或注入噪声的训练过程至关重要。
    - Comfy dtype: NOISE_SHAPE
    - Python dtype: Tuple[int, int, int, int, int]
- context_overlap
    - 上下文重叠输出指示在生成当前序列时考虑的先前运动控制上下文的重叠量。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class MotionctrlCond:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model': ('MOTIONCTRL',), 'prompt': ('STRING', {'multiline': True, 'default': 'a rose swaying in the wind'}), 'camera': ('STRING', {'multiline': True, 'default': '[[1,0,0,0,0,1,0,0,0,0,1,0.2]]'}), 'traj': ('STRING', {'multiline': True, 'default': '[[117, 102]]'}), 'infer_mode': (MODE, {'default': 'control both camera and object motion'}), 'context_overlap': ('INT', {'default': 0, 'min': 0, 'max': 32})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'TRAJ_LIST', 'RT_LIST', 'TRAJ_FEATURES', 'RT', 'NOISE_SHAPE', 'INT')
    RETURN_NAMES = ('positive', 'negative', 'traj_list', 'rt_list', 'traj', 'rt', 'noise_shape', 'context_overlap')
    FUNCTION = 'load_cond'
    CATEGORY = 'motionctrl'

    def load_cond(self, model, prompt, camera, traj, infer_mode, context_overlap):
        comfy_path = os.path.dirname(folder_paths.__file__)
        camera_align_file = os.path.join(comfy_path, 'custom_nodes/ComfyUI-MotionCtrl/camera.json')
        traj_align_file = os.path.join(comfy_path, 'custom_nodes/ComfyUI-MotionCtrl/traj.json')
        frame_length = model.temporal_length
        camera_align = json.loads(camera)
        for i in range(frame_length):
            if len(camera_align) <= i:
                camera_align.append(camera_align[len(camera_align) - 1])
        camera = json.dumps(camera_align)
        traj_align = json.loads(traj)
        for i in range(frame_length):
            if len(traj_align) <= i:
                traj_align.append(traj_align[len(traj_align) - 1])
        traj = json.dumps(traj_align)
        if context_overlap > 0:
            if os.path.exists(camera_align_file):
                with open(camera_align_file, 'r') as file:
                    pre_camera_align = json.load(file)
                    camera_align = pre_camera_align[:context_overlap] + camera_align[:-context_overlap]
            if os.path.exists(traj_align_file):
                with open(traj_align_file, 'r') as file:
                    pre_traj_align = json.load(file)
                    traj_align = pre_traj_align[:context_overlap] + traj_align[:-context_overlap]
            with open(camera_align_file, 'w') as file:
                json.dump(camera_align, file)
            with open(traj_align_file, 'w') as file:
                json.dump(traj_align, file)
        prompts = prompt
        RT = process_camera(camera, frame_length).reshape(-1, 12)
        RT_list = process_camera_list(camera, frame_length)
        traj_flow = process_traj(traj, frame_length).transpose(3, 0, 1, 2)
        print(prompts)
        print(RT.shape)
        print(traj_flow.shape)
        height = 256
        width = 256
        assert height % 16 == 0 and width % 16 == 0, 'Error: image size [h,w] should be multiples of 16!'
        (h, w) = (height // 8, width // 8)
        channels = model.channels
        frames = model.temporal_length
        noise_shape = [1, channels, frames, h, w]
        if infer_mode == MODE[0]:
            camera_poses = RT
            camera_poses = torch.tensor(camera_poses).float()
            camera_poses = camera_poses.unsqueeze(0)
            trajs = None
            if torch.cuda.is_available():
                camera_poses = camera_poses.cuda()
        elif infer_mode == MODE[1]:
            trajs = traj_flow
            trajs = torch.tensor(trajs).float()
            trajs = trajs.unsqueeze(0)
            camera_poses = None
            if torch.cuda.is_available():
                trajs = trajs.cuda()
        else:
            camera_poses = RT
            trajs = traj_flow
            camera_poses = torch.tensor(camera_poses).float()
            trajs = torch.tensor(trajs).float()
            camera_poses = camera_poses.unsqueeze(0)
            trajs = trajs.unsqueeze(0)
            if torch.cuda.is_available():
                camera_poses = camera_poses.cuda()
                trajs = trajs.cuda()
        batch_size = noise_shape[0]
        prompts = prompt
        if isinstance(prompts, str):
            prompts = [prompts]
        for i in range(len(prompts)):
            prompts[i] = f'{prompts[i]}, {post_prompt}'
        cond = model.get_learned_conditioning(prompts)
        if camera_poses is not None:
            RT = camera_poses[..., None]
        else:
            RT = None
        traj_features = None
        if trajs is not None:
            traj_features = model.get_traj_features(trajs)
        else:
            traj_features = None
        uc = None
        prompts = batch_size * [DEFAULT_NEGATIVE_PROMPT]
        uc = model.get_learned_conditioning(prompts)
        if traj_features is not None:
            un_motion = model.get_traj_features(torch.zeros_like(trajs))
        else:
            un_motion = None
        uc = {'features_adapter': un_motion, 'uc': uc}
        return (cond, uc, traj, RT_list, traj_features, RT, noise_shape, context_overlap)
```
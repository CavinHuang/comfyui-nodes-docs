# Documentation
- Class name: MotionctrlSample
- Category: motionctrl
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-MotionCtrl.git

MotionctrlSample 类旨在通过将运动控制融入渲染过程来促进动态视觉内容的生成。它利用先进算法的力量解释用户定义的相机和轨迹输入，使得能够创造出带有逼真动画的复杂运动序列。该节点抽象了运动模拟的复杂性，允许用户专注于创造性表达而不是底层技术细节。

# Input types
## Required
- prompt
    - 提示参数作为MotionctrlSample节点的创意输入，指导生成内容的整体主题和风格。它对于设置运动模拟发生的上下文至关重要，直接影响渲染过程中产生的叙述和视觉元素。
    - Comfy dtype: STRING
    - Python dtype: str
- camera
    - 相机参数定义了捕捉运动序列的视角和视点。它在塑造渲染场景中的时空关系和深度感知方面起着关键作用，从而显著影响最终的视觉输出。
    - Comfy dtype: STRING
    - Python dtype: str
- traj
    - 轨迹参数概述了场景中物体的路径和运动，成为运动模拟的基础。它对于指导动画的动态性和元素的相互作用至关重要，确保了运动表现的连贯性和流畅性。
    - Comfy dtype: STRING
    - Python dtype: str
- frame_length
    - 帧长度参数指定了动画序列的持续时间，直接影响运动轨迹的详细程度和复杂性。较长的帧长度允许更复杂的运动模式和更平滑的过渡，而较短的帧长度可能导致更简单或更突然的运动。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步数参数决定了运动模拟过程中生成的中间帧数，这影响动画的平滑度和质量。步数越高，运动轨迹越精细，而步数较低可能导致动画细节不足或不连贯。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 种子参数用于初始化随机数生成器，确保运动模拟结果是可复现和一致的。这对于调试和比较不同模拟运行是重要的方面。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - MotionctrlSample 节点的输出是一个动态视觉表示，以图像或图像序列的形式，封装了运动模拟的结果。它反映了输入参数的综合效应，展示了生成的运动内容的创造性和复杂性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class MotionctrlSample:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'prompt': ('STRING', {'multiline': True, 'default': 'a rose swaying in the wind'}), 'camera': ('STRING', {'multiline': True, 'default': '[[1,0,0,0,0,1,0,0,0,0,1,0.2]]'}), 'traj': ('STRING', {'multiline': True, 'default': '[[117, 102]]'}), 'frame_length': ('INT', {'default': 16}), 'steps': ('INT', {'default': 50}), 'seed': ('INT', {'default': 1234})}, 'optional': {'traj_tool': ('STRING', {'multiline': False, 'default': 'https://chaojie.github.io/ComfyUI-MotionCtrl/tools/draw.html'}), 'draw_traj_dot': ('BOOLEAN', {'default': False}), 'draw_camera_dot': ('BOOLEAN', {'default': False}), 'ckpt_name': (['motionctrl.pth'], {'default': 'motionctrl.pth'})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'run_inference'
    CATEGORY = 'motionctrl'

    def run_inference(self, prompt, camera, traj, frame_length, steps, seed, traj_tool='https://chaojie.github.io/ComfyUI-MotionCtrl/tools/draw.html', draw_traj_dot=False, draw_camera_dot=False, ckpt_name='motionctrl.pth'):
        gpu_num = 1
        gpu_no = 0
        ckpt_path = folder_paths.get_full_path('checkpoints', ckpt_name)
        comfy_path = os.path.dirname(folder_paths.__file__)
        config_path = os.path.join(comfy_path, 'custom_nodes/ComfyUI-MotionCtrl/configs/inference/config_both.yaml')
        args = {'savedir': f'./output/both_seed20230211', 'ckpt_path': f'{ckpt_path}', 'adapter_ckpt': None, 'base': f'{config_path}', 'condtype': 'both', 'prompt_dir': None, 'n_samples': 1, 'ddim_steps': 50, 'ddim_eta': 1.0, 'bs': 1, 'height': 256, 'width': 256, 'unconditional_guidance_scale': 1.0, 'unconditional_guidance_scale_temporal': None, 'seed': 1234, 'cond_T': 800, 'save_imgs': True, 'cond_dir': './custom_nodes/ComfyUI-MotionCtrl/examples/'}
        prompts = prompt
        RT = process_camera(camera, frame_length).reshape(-1, 12)
        RT_list = process_camera_list(camera, frame_length)
        traj_flow = process_traj(traj, frame_length).transpose(3, 0, 1, 2)
        print(prompts)
        print(RT.shape)
        print(traj_flow.shape)
        args['savedir'] = f"./output/{args['condtype']}_seed{args['seed']}"
        config = OmegaConf.load(args['base'])
        OmegaConf.update(config, 'model.params.unet_config.params.temporal_length', frame_length)
        model_config = config.pop('model', OmegaConf.create())
        model = instantiate_from_config(model_config)
        model = model.cuda(gpu_no)
        assert os.path.exists(args['ckpt_path']), f"Error: checkpoint {args['ckpt_path']} Not Found!"
        print(f"Loading checkpoint from {args['ckpt_path']}")
        model = load_model_checkpoint(model, args['ckpt_path'], args['adapter_ckpt'])
        model.eval()
        assert args['height'] % 16 == 0 and args['width'] % 16 == 0, 'Error: image size [h,w] should be multiples of 16!'
        (h, w) = (args['height'] // 8, args['width'] // 8)
        channels = model.channels
        frames = model.temporal_length
        noise_shape = [args['bs'], channels, frames, h, w]
        savedir = os.path.join(args['savedir'], 'samples')
        os.makedirs(savedir, exist_ok=True)
        unconditional_guidance_scale = 7.5
        unconditional_guidance_scale_temporal = None
        n_samples = 1
        ddim_steps = steps
        ddim_eta = 1.0
        cond_T = 800
        if n_samples < 1:
            n_samples = 1
        if n_samples > 4:
            n_samples = 4
        seed_everything(seed)
        camera_poses = RT
        trajs = traj_flow
        camera_poses = torch.tensor(camera_poses).float()
        trajs = torch.tensor(trajs).float()
        camera_poses = camera_poses.unsqueeze(0)
        trajs = trajs.unsqueeze(0)
        if torch.cuda.is_available():
            camera_poses = camera_poses.cuda()
            trajs = trajs.cuda()
        ddim_sampler = DDIMSampler(model)
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
        if unconditional_guidance_scale != 1.0:
            prompts = batch_size * [DEFAULT_NEGATIVE_PROMPT]
            uc = model.get_learned_conditioning(prompts)
            if traj_features is not None:
                un_motion = model.get_traj_features(torch.zeros_like(trajs))
            else:
                un_motion = None
            uc = {'features_adapter': un_motion, 'uc': uc}
        else:
            uc = None
        batch_images = []
        batch_variants = []
        for _ in range(n_samples):
            if ddim_sampler is not None:
                (samples, _) = ddim_sampler.sample(S=ddim_steps, conditioning=cond, batch_size=noise_shape[0], shape=noise_shape[1:], verbose=False, unconditional_guidance_scale=unconditional_guidance_scale, unconditional_conditioning=uc, eta=ddim_eta, temporal_length=noise_shape[2], conditional_guidance_scale_temporal=unconditional_guidance_scale_temporal, features_adapter=traj_features, pose_emb=RT, cond_T=cond_T)
            batch_images = model.decode_first_stage(samples)
            batch_variants.append(batch_images)
        batch_variants = torch.stack(batch_variants, dim=1)
        batch_variants = batch_variants[0]
        ret = save_results(batch_variants, fps=10, traj=traj, draw_traj_dot=draw_traj_dot, cameras=RT_list, draw_camera_dot=draw_camera_dot)
        return ret
```
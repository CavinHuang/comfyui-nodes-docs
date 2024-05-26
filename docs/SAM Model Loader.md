# Documentation
- Class name: WAS_SAM_Model_Loader
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

sam_load_model 函数旨在根据指定的模型大小加载和初始化预训练的 Segment Anything Model (SAM)。如果模型权重尚未存在，则它负责下载模型权重并为后续的图像分割任务设置模型。该节点对于图像遮罩过程至关重要，为 WAS Suite 中的高质量对象分割提供了基础。

# Input types
## Required
- model_size
    - model_size 参数对于确定要加载的特定 SAM 模型至关重要。它决定了模型的复杂性和大小，这直接影响了分割任务的性能和准确性。此参数确保在图像掩蔽过程中使用了正确的预训练模型。
    - Comfy dtype: COMBO['ViT-H', 'ViT-L', 'ViT-B']
    - Python dtype: str

# Output types
- SAM_MODEL
    - 输出的 SAM_MODEL 表示已加载并准备使用的 Segment Anything Model。这是一个专为高质量对象分割而设计的预训练深度学习模型。该模型是图像掩蔽工作流程中后续步骤的关键组件，能够实现图像中对象的精确和高效分割。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class WAS_SAM_Model_Loader:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {'required': {'model_size': (['ViT-H', 'ViT-L', 'ViT-B'],)}}
    RETURN_TYPES = ('SAM_MODEL',)
    FUNCTION = 'sam_load_model'
    CATEGORY = 'WAS Suite/Image/Masking'

    def sam_load_model(self, model_size):
        conf = getSuiteConfig()
        model_filename_mapping = {'ViT-H': 'sam_vit_h_4b8939.pth', 'ViT-L': 'sam_vit_l_0b3195.pth', 'ViT-B': 'sam_vit_b_01ec64.pth'}
        model_url_mapping = {'ViT-H': conf['sam_model_vith_url'] if conf.__contains__('sam_model_vith_url') else 'https://dl.fbaipublicfiles.com/segment_anything/sam_vit_h_4b8939.pth', 'ViT-L': conf['sam_model_vitl_url'] if conf.__contains__('sam_model_vitl_url') else 'https://dl.fbaipublicfiles.com/segment_anything/sam_vit_l_0b3195.pth', 'ViT-B': conf['sam_model_vitb_url'] if conf.__contains__('sam_model_vitb_url') else 'https://dl.fbaipublicfiles.com/segment_anything/sam_vit_b_01ec64.pth'}
        model_url = model_url_mapping[model_size]
        model_filename = model_filename_mapping[model_size]
        if 'GitPython' not in packages():
            install_package('gitpython')
        if not os.path.exists(os.path.join(WAS_SUITE_ROOT, 'repos' + os.sep + 'SAM')):
            from git.repo.base import Repo
            cstr('Installing SAM...').msg.print()
            Repo.clone_from('https://github.com/facebookresearch/segment-anything', os.path.join(WAS_SUITE_ROOT, 'repos' + os.sep + 'SAM'))
        sys.path.append(os.path.join(WAS_SUITE_ROOT, 'repos' + os.sep + 'SAM'))
        sam_dir = os.path.join(MODELS_DIR, 'sam')
        if not os.path.exists(sam_dir):
            os.makedirs(sam_dir, exist_ok=True)
        sam_file = os.path.join(sam_dir, model_filename)
        if not os.path.exists(sam_file):
            cstr('Selected SAM model not found. Downloading...').msg.print()
            r = requests.get(model_url, allow_redirects=True)
            open(sam_file, 'wb').write(r.content)
        from segment_anything import build_sam_vit_h, build_sam_vit_l, build_sam_vit_b
        if model_size == 'ViT-H':
            sam_model = build_sam_vit_h(sam_file)
        elif model_size == 'ViT-L':
            sam_model = build_sam_vit_l(sam_file)
        elif model_size == 'ViT-B':
            sam_model = build_sam_vit_b(sam_file)
        else:
            raise ValueError(f"SAM model does not match the model_size: '{model_size}'.")
        return (sam_model,)
```
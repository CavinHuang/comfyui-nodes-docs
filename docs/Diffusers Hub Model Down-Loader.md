# Documentation
- Class name: WAS_Diffusers_Hub_Model_Loader
- Category: WAS Suite/Loaders/Advanced
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Diffusers_Hub_Model_Loader节点旨在方便从Hugging Face模型中心加载高级机器学习模型。它简化了下载和初始化模型、clips和VAEs的过程，使用户能够快速将这些组件集成到他们的工作流程中。此节点对于需要复杂模型能力的自然语言处理和生成性AI等任务至关重要。

# Input types
## Required
- repo_id
    - repo_id参数对于识别Hugging Face hub上的具体模型存储库至关重要。它在节点的执行中起着关键作用，通过将下载过程指向正确的来源，确保准确检索所需的模型。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- revision
    - revision参数允许指定存储库中模型的特定版本。对于需要特定模型迭代以完成其任务的用户来说，它很重要，确保了模型性能的可重复性和一致性。
    - Comfy dtype: STRING
    - Python dtype: Union[str, None]

# Output types
- model
    - 模型输出提供了加载的机器学习模型，可供推理或进一步处理使用。它是节点功能的核心组件，为用户提供了直接访问模型预测能力的机会。
    - Comfy dtype: MODEL
    - Python dtype: Any
- clip
    - clip输出是通常与模型一起使用的组件，用于涉及文本和图像交互的任务。对于利用该节点进行高级自然语言处理应用的用户来说，它非常重要。
    - Comfy dtype: CLIP
    - Python dtype: Any
- vae
    - vae输出是一种变分自编码器，用于生成任务的神经网络类型。对于希望基于学习到的数据集分布生成新数据实例的用户来说，它是一个宝贵的资产。
    - Comfy dtype: VAE
    - Python dtype: Any
- name_string
    - name_string输出以字符串形式返回存储库ID，为加载的模型提供人类可读的标识符。它在工作流中的引用和记录目的中非常有用。
    - Comfy dtype: TEXT_TYPE
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Diffusers_Hub_Model_Loader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'repo_id': ('STRING', {'multiline': False}), 'revision': ('STRING', {'default': 'None', 'multiline': False})}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE', TEXT_TYPE)
    RETURN_NAMES = ('MODEL', 'CLIP', 'VAE', 'NAME_STRING')
    FUNCTION = 'load_hub_checkpoint'
    CATEGORY = 'WAS Suite/Loaders/Advanced'

    def load_hub_checkpoint(self, repo_id=None, revision=None):
        if revision in ['', 'None', 'none', None]:
            revision = None
        model_path = comfy_paths.get_folder_paths('diffusers')[0]
        self.download_diffusers_model(repo_id, model_path, revision)
        diffusersLoader = nodes.DiffusersLoader()
        (model, clip, vae) = diffusersLoader.load_checkpoint(os.path.join(model_path, repo_id))
        return (model, clip, vae, repo_id)

    def download_diffusers_model(self, repo_id, local_dir, revision=None):
        if 'huggingface-hub' not in packages():
            install_package('huggingface_hub')
        from huggingface_hub import snapshot_download
        model_path = os.path.join(local_dir, repo_id)
        ignore_patterns = ['*.ckpt', '*.safetensors', '*.onnx']
        snapshot_download(repo_id=repo_id, repo_type='model', local_dir=model_path, revision=revision, use_auth_token=False, ignore_patterns=ignore_patterns)
```
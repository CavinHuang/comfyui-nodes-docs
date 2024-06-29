# Documentation
- Class name: WAS_Cache
- Category: WAS Suite/IO
- Output node: True
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Cache节点旨在为WAS套件高效地管理和存储输入数据。它缓存潜在向量、图像和条件数据，确保数据在后续处理阶段随时可用。该节点通过减少重新计算或重新获取数据的需求，在优化工作流程中发挥着关键作用，从而提高系统的整体性能。

# Input types
## Required
- latent_suffix
    - latent_suffix参数用于定义缓存的潜在向量的文件名后缀。这对于区分不同的潜在向量集至关重要，对于节点管理和检索正确数据的能力非常关键。
    - Comfy dtype: STRING
    - Python dtype: str
- image_suffix
    - image_suffix参数指定缓存图像的文件名后缀。这个后缀对于节点在需要时正确识别和访问图像数据至关重要，有助于有组织地处理视觉信息。
    - Comfy dtype: STRING
    - Python dtype: str
- conditioning_suffix
    - conditioning_suffix参数应用于缓存条件数据的文件名后缀。它是节点组织和维护条件信息访问策略的关键要素，对于工作流程中的后续步骤至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- output_path
    - output_path参数决定了缓存数据将被存储的目录。它在选择存储位置方面提供了灵活性，对节点的操作非常重要，特别是在数据需要存储在特定目录以进行进一步处理的场景中。
    - Comfy dtype: STRING
    - Python dtype: str
- latent
    - latent参数表示要缓存的潜在向量。它是节点的重要输入，因为它直接影响将要存储并在工作流程的后续阶段中使用的数据。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- image
    - image参数包含节点预期要缓存的图像数据。它是一个关键输入，因为它涉及到需要在系统内保留以备将来使用的视觉内容。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- conditioning
    - conditioning参数负责提供要缓存的条件数据。这些数据对于指导生成过程至关重要，是节点功能的重要输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor

# Output types
- latent_filename
    - latent_filename输出提供了缓存的潜在向量的文件名。这很重要，因为它允许在需要时轻松引用和检索潜在数据。
    - Comfy dtype: STRING
    - Python dtype: str
- image_filename
    - image_filename输出表示缓存的图像数据的文件名。这是一个重要的信息片段，它便于在后续操作中访问和使用图像内容。
    - Comfy dtype: STRING
    - Python dtype: str
- conditioning_filename
    - conditioning_filename输出指示缓存的条件数据的文件名。这个输出对于系统在生成过程中正确定位和使用条件信息至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Cache:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'latent_suffix': ('STRING', {'default': str(random.randint(999999, 99999999)) + '_cache', 'multiline': False}), 'image_suffix': ('STRING', {'default': str(random.randint(999999, 99999999)) + '_cache', 'multiline': False}), 'conditioning_suffix': ('STRING', {'default': str(random.randint(999999, 99999999)) + '_cache', 'multiline': False})}, 'optional': {'output_path': ('STRING', {'default': os.path.join(WAS_SUITE_ROOT, 'cache'), 'multiline': False}), 'latent': ('LATENT',), 'image': ('IMAGE',), 'conditioning': ('CONDITIONING',)}}
    RETURN_TYPES = (TEXT_TYPE, TEXT_TYPE, TEXT_TYPE)
    RETURN_NAMES = ('latent_filename', 'image_filename', 'conditioning_filename')
    FUNCTION = 'cache_input'
    OUTPUT_NODE = True
    CATEGORY = 'WAS Suite/IO'

    def cache_input(self, latent_suffix='_cache', image_suffix='_cache', conditioning_suffix='_cache', output_path=None, latent=None, image=None, conditioning=None):
        if 'joblib' not in packages():
            install_package('joblib')
        import joblib
        output = os.path.join(WAS_SUITE_ROOT, 'cache')
        if output_path:
            if output_path.strip() not in ['', 'none', 'None']:
                output = output_path
        if not os.path.isabs(output):
            output = os.path.abspath(output)
        if not os.path.exists(output):
            os.makedirs(output, exist_ok=True)
        l_filename = ''
        i_filename = ''
        c_filename = ''
        tokens = TextTokens()
        output = tokens.parseTokens(output)
        if latent != None:
            l_filename = f'{tokens.parseTokens(latent_suffix)}.latent'
            out_file = os.path.join(output, l_filename)
            joblib.dump(latent, out_file)
            cstr(f'Latent saved to: {out_file}').msg.print()
        if image != None:
            i_filename = f'{tokens.parseTokens(image_suffix)}.image'
            out_file = os.path.join(output, i_filename)
            joblib.dump(image, out_file)
            cstr(f'Tensor batch saved to: {out_file}').msg.print()
        if conditioning != None:
            c_filename = f'{tokens.parseTokens(conditioning_suffix)}.conditioning'
            out_file = os.path.join(output, c_filename)
            joblib.dump(conditioning, os.path.join(output, out_file))
            cstr(f'Conditioning saved to: {out_file}').msg.print()
        return (l_filename, i_filename, c_filename)
```
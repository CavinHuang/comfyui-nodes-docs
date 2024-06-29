# comfyui_controlnet_aux
comfyui_controlnet_aux is a collection of plug-and-play node sets designed for use with ComfyUI, aimed at generating ControlNet hint images for various preprocessing tasks such as line extraction, depth estimation, and semantic segmentation. It integrates code from ControlNet's annotator folders and connects to the 🤗 Hub for easy access to pre-trained models, supporting a wide range of preprocessors for creating hint images like stickman, canny edge, and more.

## Tags
Animation * ControlNet * DepthMap * DepthMapEstimation * Image * ImageEnhancement * ImageFilter * ImagePreprocessing * ImageResolution * ImageTransformation * Inpaint * LineExtraction * MediaPipeFaceMesh * NormalMap * OpticalFlow * PoseEstimation * SAM * Segmentation * SemanticSegmentationPreprocessing * Tiled

## Repo info
- Repo url: `https://github.com/Fannovel16/comfyui_controlnet_aux`
- Commit hash: `692a3d0f70d6be02d5509c5ebeac16081c6e05c8`

## Licenses
- **Apache-2.0**: `LICENSE.txt`
- LicenseRef-scancode-generic-cla, LicenseRef-scancode-unknown-license-reference, MIT: `src/controlnet_aux/depth_anything/torchhub/facebookresearch_dinov2_main/CONTRIBUTING.md`
- CC-BY-NC-4.0: `src/controlnet_aux/depth_anything/torchhub/facebookresearch_dinov2_main/LICENSE`
- CC-BY-NC-4.0: `src/controlnet_aux/depth_anything/torchhub/facebookresearch_dinov2_main/MODEL_CARD.md`
- CC-BY-NC-4.0, LicenseRef-scancode-unknown-license-reference: `src/controlnet_aux/depth_anything/torchhub/facebookresearch_dinov2_main/README.md`
- MIT: `src/controlnet_aux/depth_anything/torchhub/facebookresearch_dinov2_main/dinov2/__init__.py`
- Apache-2.0, MIT: `src/controlnet_aux/depth_anything/torchhub/facebookresearch_dinov2_main/hubconf.py`
- CC-BY-NC-4.0, LicenseRef-scancode-proprietary-license, LicenseRef-scancode-unknown-license-reference, MIT: `src/controlnet_aux/depth_anything/torchhub/facebookresearch_dinov2_main/setup.py`
- Apache-2.0, MIT: `src/controlnet_aux/depth_anything/torchhub/facebookresearch_dinov2_main/vision_transformer.py`
- Apache-2.0, BSD-3-Clause, LicenseRef-scancode-proprietary-license, LicenseRef-scancode-unknown-license-reference: `src/controlnet_aux/dsine/LICENSE`
- Apache-2.0: `src/controlnet_aux/dsine/models/submodules/efficientnet_repo/LICENSE`
- Apache-2.0: `src/controlnet_aux/dsine/models/submodules/efficientnet_repo/setup.py`
- BSD-2-Clause, LicenseRef-scancode-generic-cla, LicenseRef-scancode-proprietary-license, LicenseRef-scancode-unknown-license-reference, PostgreSQL: `src/controlnet_aux/dwpose/LICENSE`
- LicenseRef-scancode-proprietary-license: `src/controlnet_aux/dwpose/__init__.py`
- Apache-2.0: `src/controlnet_aux/hed/__init__.py`
- MIT: `src/controlnet_aux/leres/leres/LICENSE`
- BSD-1-Clause: `src/controlnet_aux/leres/pix2pix/LICENSE`
- Apache-2.0: `src/controlnet_aux/mlsd/utils.py`
- LicenseRef-scancode-proprietary-license, MIT: `src/controlnet_aux/pidi/LICENSE`
- MIT: `src/controlnet_aux/uniformer/uniformer.py`
- ICU, MIT: `src/controlnet_aux/unimatch/utils/flow_viz.py`
- MIT: `src/controlnet_aux/zoe/zoedepth/models/base_models/midas.py`
- Apache-2.0: `src/custom_detectron2/layers/csrc/deformable/deform_conv_cuda.cu`
- Apache-2.0: `src/custom_detectron2/layers/csrc/deformable/deform_conv_cuda_kernel.cu`
- Apache-2.0, MIT: `src/custom_detectron2/modeling/backbone/swin.py`
- GPL-3.0-only: `src/custom_manopth/LICENSE`
- MIT: `src/custom_mesh_graphormer/datasets/build.py`
- MIT: `src/custom_midas_repo/README.md`
- Apache-2.0: `src/custom_mmpkg/custom_mmseg/models/losses/dice_loss.py`
- Apache-2.0: `src/custom_oneformer/modeling/pixel_decoder/ops/make.sh`
- BSD-2-Clause: `src/custom_pycocotools/coco.py`
- BSD-2-Clause: `src/custom_pycocotools/cocoeval.py`
- Apache-2.0: `src/custom_timm/data/random_erasing.py`
- Apache-2.0: `src/custom_timm/data/tf_preprocessing.py`
- Apache-2.0, MIT: `src/custom_timm/models/byobnet.py`
- CC-BY-NC-4.0, MIT: `src/custom_timm/models/convit.py`
- MIT: `src/custom_timm/models/convnext.py`
- Apache-2.0: `src/custom_timm/models/crossvit.py`
- BSD-3-Clause: `src/custom_timm/models/densenet.py`
- Apache-2.0: `src/custom_timm/models/efficientformer.py`
- Apache-2.0, CC-BY-NC-SA-4.0, LicenseRef-scancode-proprietary-license: `src/custom_timm/models/gcvit.py`
- Apache-2.0, MIT: `src/custom_timm/models/inception_resnet_v2.py`
- MIT: `src/custom_timm/models/layers/eca.py`
- Apache-2.0: `src/custom_timm/models/mvitv2.py`
- CC-BY-NC-4.0, LicenseRef-scancode-proprietary-license: `src/custom_timm/models/resnet.py`
- Apache-2.0: `src/custom_timm/models/sequencer.py`
- Apache-2.0, LicenseRef-scancode-unknown-license-reference: `src/custom_timm/models/twins.py`
- MIT: `src/custom_timm/optim/adafactor.py`
- MIT: `src/custom_timm/optim/adahessian.py`
- Apache-2.0, MIT: `src/custom_timm/optim/lamb.py`
- LicenseRef-scancode-unknown-license-reference: `src/custom_timm/optim/rmsprop_tf.py`

Visit [licenses page](licenses.md) for the details

// Kargul hero replica C (study only, never published): Supermetal landing hero, family "dark centred over an integration
// constellation". Reference: knowledge/benchmarks/kargul-heroes/originals/case-supermetal-00.png (cdn.sanity.io original,
// 2880x2070 = 1440x1035 CSS, exact 2x). Every number is a CSS px reading of the 2x original (kh.py bands/words/row/col/btn,
// trace.py for the connector paths, rle.py for the brand marks). Third-party database logos are flat stand-ins.
// Measured construction:
//  - page #111111; content rails 1px #1b1b1b at x 139.5 and 1300; outside the rails steep 1px stripes #1b1b1b at a 9.25px
//    pitch (dx/dy 0.2); nav 72px with a 1px #1b1b1b rule; links Chakra Petch 15/500 #a0a0a0, right items white.
//  - h1 Chakra Petch 64/500 -0.03em white, 2 lines, ink 134..254 (pitch 60); sub 17/500 #a0a0a0 lh 22, 3 lines centred.
//  - CTA row y 372..423: primary 180x51 #ea580c with a 1px #ee793d edge and 45deg chamfers (top-right 19, bottom-left 19);
//    secondary 167x51 #1d1d1d with a 1px #282828 edge; 15px apart. Meta line "Built in Rust and Apache Arrow" 447..464.
//  - 16 tiles 56x66 #000 with a 1px #2f2c2a edge, chamfer 16 at the outer-top corner and 10 at the inner-bottom corner;
//    columns at x 235 / 302 (mirrored 1149 / 1082), rows 470, 522.5, 589, 637, 685, 733, 799, 850.
//  - each tile wires a 1px #2b2b2b line from its centre to a 7px node (#000, 1px #4b4743) with a dashed orange lead-in,
//    then bends (r 12) into a straight run that lands on the core face at y 634 + 22k (k = rank of the tile).
//  - core: front face 629..809 x 645..823 #000 with a 6x12 dot grid of 1px #262626 dots and a 1px #242221 edge; top face
//    a trapezoid 633..805 at y 618 to 629..809 at y 644; the S mark #ea580c 684..753.5 x 686..775.5.
//  - floor: radial lines from (720, 25) between y 600 and 986, horizontal floor lines at 743 / 794 / 851 / 915 / 986, an
//    orange floor glow under the core and a dark contact shadow.
import type { CSSProperties } from 'react'

const FONT = '"Chakra Petch", sans-serif'
const W = 1440, H = 1035
const P_S = 'M718.5 686h0.5v0.5h-0.5zM717.5 686.5h2v0.5h-2zM716.5 687h4v0.5h-4zM715.5 687.5h6v0.5h-6zM715 688h7.5v0.5h-7.5zM714 688.5h9v0.5h-9zM713 689h11v0.5h-11zM712 689.5h13v0.5h-13zM711.5 690h14v0.5h-14zM710.5 690.5h16v0.5h-16zM709.5 691h18v0.5h-18zM709 691.5h19.5v0.5h-19.5zM708 692h21v0.5h-21zM707 692.5h23v0.5h-23zM706 693h25v0.5h-25zM705.5 693.5h26.5v0.5h-26.5zM704.5 694h28v0.5h-28zM703.5 694.5h30v0.5h-30zM702.5 695h32v0.5h-32zM702 695.5h33v0.5h-33zM701 696h35v0.5h-35zM700 696.5h37v0.5h-37zM699.5 697h38.5v0.5h-38.5zM698.5 697.5h40v0.5h-40zM697.5 698h42v0.5h-42zM696.5 698.5h44v0.5h-44zM696 699h45.5v0.5h-45.5zM695 699.5h47v0.5h-47zM694 700h49v0.5h-49zM693 700.5h25v0.5h-25zM719 700.5h25v0.5h-25zM692.5 701h25v0.5h-25zM720 701h24.5v0.5h-24.5zM691.5 701.5h25v0.5h-25zM720.5 701.5h25v0.5h-25zM690.5 702h25v0.5h-25zM721.5 702h25v0.5h-25zM690 702.5h25v0.5h-25zM722.5 702.5h25v0.5h-25zM689 703h25v0.5h-25zM723.5 703h24.5v0.5h-24.5zM688 703.5h25v0.5h-25zM724 703.5h25v0.5h-25zM687 704h25v0.5h-25zM725 704h25v0.5h-25zM686.5 704.5h25v0.5h-25zM726 704.5h25v0.5h-25zM685.5 705h25v0.5h-25zM727 705h24.5v0.5h-24.5zM684.5 705.5h25v0.5h-25zM727.5 705.5h25v0.5h-25zM684 706h24.5v0.5h-24.5zM728.5 706h24.5v0.5h-24.5zM684 706.5h24v0.5h-24zM729.5 706.5h23.5v0.5h-23.5zM684 707h23v0.5h-23zM730 707h23v0.5h-23zM684 707.5h22v0.5h-22zM731 707.5h22v0.5h-22zM684 708h21.5v0.5h-21.5zM732 708h21v0.5h-21zM684 708.5h20.5v0.5h-20.5zM733 708.5h20v0.5h-20zM684 709h19.5v0.5h-19.5zM733.5 709h19.5v0.5h-19.5zM684 709.5h18.5v0.5h-18.5zM734.5 709.5h18.5v0.5h-18.5zM684 710h18v0.5h-18zM735.5 710h17.5v0.5h-17.5zM684 710.5h17v0.5h-17zM736.5 710.5h16.5v0.5h-16.5zM684 711h16v0.5h-16zM737 711h16v0.5h-16zM684 711.5h15v0.5h-15zM718.5 711.5h1v0.5h-1zM738 711.5h15v0.5h-15zM684 712h14.5v0.5h-14.5zM718.5 712h1.5v0.5h-1.5zM739 712h14v0.5h-14zM684 712.5h13.5v0.5h-13.5zM718.5 712.5h2.5v0.5h-2.5zM739.5 712.5h13.5v0.5h-13.5zM684 713h12.5v0.5h-12.5zM718.5 713h3.5v0.5h-3.5zM740.5 713h12.5v0.5h-12.5zM684 713.5h11.5v0.5h-11.5zM718.5 713.5h4.5v0.5h-4.5zM741.5 713.5h11.5v0.5h-11.5zM684 714h11v0.5h-11zM718.5 714h5v0.5h-5zM742.5 714h10.5v0.5h-10.5zM684 714.5h10v0.5h-10zM718.5 714.5h6v0.5h-6zM743 714.5h10v0.5h-10zM684 715h9v0.5h-9zM718.5 715h7v0.5h-7zM744 715h9v0.5h-9zM684 715.5h8.5v0.5h-8.5zM718.5 715.5h8v0.5h-8zM745 715.5h8v0.5h-8zM684 716h7.5v0.5h-7.5zM718.5 716h8.5v0.5h-8.5zM746 716h7v0.5h-7zM684 716.5h6.5v0.5h-6.5zM718.5 716.5h9.5v0.5h-9.5zM746.5 716.5h6.5v0.5h-6.5zM684 717h5.5v0.5h-5.5zM718.5 717h10.5v0.5h-10.5zM747.5 717h5.5v0.5h-5.5zM684 717.5h5v0.5h-5zM718.5 717.5h11.5v0.5h-11.5zM748.5 717.5h4.5v0.5h-4.5zM684 718h4.5v0.5h-4.5zM718.5 718h12v0.5h-12zM749 718h4v0.5h-4zM684 718.5h5.5v0.5h-5.5zM718.5 718.5h13v0.5h-13zM750 718.5h3v0.5h-3zM684 719h6v0.5h-6zM718.5 719h14v0.5h-14zM751 719h2v0.5h-2zM684 719.5h7v0.5h-7zM718.5 719.5h14.5v0.5h-14.5zM752 719.5h1v0.5h-1zM684 720h8v0.5h-8zM718.5 720h15.5v0.5h-15.5zM752.5 720h0.5v0.5h-0.5zM684 720.5h9v0.5h-9zM718.5 720.5h16.5v0.5h-16.5zM684 721h9.5v0.5h-9.5zM718.5 721h17.5v0.5h-17.5zM684 721.5h10.5v0.5h-10.5zM718.5 721.5h18v0.5h-18zM684 722h11.5v0.5h-11.5zM718.5 722h19v0.5h-19zM684 722.5h12v0.5h-12zM718.5 722.5h20v0.5h-20zM684 723h13v0.5h-13zM718.5 723h21v0.5h-21zM684 723.5h14v0.5h-14zM718.5 723.5h21.5v0.5h-21.5zM684 724h15v0.5h-15zM718.5 724h22.5v0.5h-22.5zM684 724.5h15.5v0.5h-15.5zM718.5 724.5h23.5v0.5h-23.5zM684 725h16.5v0.5h-16.5zM718.5 725h24v0.5h-24zM684 725.5h17.5v0.5h-17.5zM718.5 725.5h25v0.5h-25zM684 726h18.5v0.5h-18.5zM719.5 726h25v0.5h-25zM684 726.5h19v0.5h-19zM720.5 726.5h25v0.5h-25zM684 727h20v0.5h-20zM721.5 727h24.5v0.5h-24.5zM684 727.5h21v0.5h-21zM722 727.5h25v0.5h-25zM684 728h21.5v0.5h-21.5zM723 728h25v0.5h-25zM684 728.5h22.5v0.5h-22.5zM724 728.5h25v0.5h-25zM684 729h23.5v0.5h-23.5zM725 729h24.5v0.5h-24.5zM684 729.5h24.5v0.5h-24.5zM725.5 729.5h25v0.5h-25zM684.5 730h24.5v0.5h-24.5zM726.5 730h25v0.5h-25zM685 730.5h25v0.5h-25zM727.5 730.5h24.5v0.5h-24.5zM686 731h25v0.5h-25zM728 731h25v0.5h-25zM687 731.5h25v0.5h-25zM729 731.5h24v0.5h-24zM688 732h24.5v0.5h-24.5zM730 732h23v0.5h-23zM688.5 732.5h25v0.5h-25zM731 732.5h22v0.5h-22zM689.5 733h25v0.5h-25zM731.5 733h21.5v0.5h-21.5zM690.5 733.5h24.5v0.5h-24.5zM732.5 733.5h20.5v0.5h-20.5zM691 734h25v0.5h-25zM733.5 734h19.5v0.5h-19.5zM692 734.5h25v0.5h-25zM734.5 734.5h18.5v0.5h-18.5zM693 735h25v0.5h-25zM735 735h18v0.5h-18zM694 735.5h24.5v0.5h-24.5zM736 735.5h17v0.5h-17zM694.5 736h24v0.5h-24zM737 736h16v0.5h-16zM695.5 736.5h23v0.5h-23zM737.5 736.5h15.5v0.5h-15.5zM696.5 737h22v0.5h-22zM738.5 737h14.5v0.5h-14.5zM697.5 737.5h21v0.5h-21zM739.5 737.5h13.5v0.5h-13.5zM698 738h20.5v0.5h-20.5zM740.5 738h12.5v0.5h-12.5zM699 738.5h19.5v0.5h-19.5zM741 738.5h12v0.5h-12zM700 739h18.5v0.5h-18.5zM742 739h11v0.5h-11zM700.5 739.5h18v0.5h-18zM743 739.5h10v0.5h-10zM701.5 740h17v0.5h-17zM744 740h9v0.5h-9zM702.5 740.5h16v0.5h-16zM744.5 740.5h8.5v0.5h-8.5zM684 741h0.5v0.5h-0.5zM703.5 741h15v0.5h-15zM745.5 741h7.5v0.5h-7.5zM684 741.5h1.5v0.5h-1.5zM704 741.5h14.5v0.5h-14.5zM746.5 741.5h6.5v0.5h-6.5zM684 742h2.5v0.5h-2.5zM705 742h13.5v0.5h-13.5zM747 742h6v0.5h-6zM684 742.5h3.5v0.5h-3.5zM706 742.5h12.5v0.5h-12.5zM748 742.5h5v0.5h-5zM684 743h4v0.5h-4zM707 743h11.5v0.5h-11.5zM748.5 743h4.5v0.5h-4.5zM684 743.5h5v0.5h-5zM707.5 743.5h11v0.5h-11zM748 743.5h5v0.5h-5zM684 744h6v0.5h-6zM708.5 744h10v0.5h-10zM747 744h6v0.5h-6zM684 744.5h6.5v0.5h-6.5zM709.5 744.5h9v0.5h-9zM746.5 744.5h6.5v0.5h-6.5zM684 745h7.5v0.5h-7.5zM710 745h8.5v0.5h-8.5zM745.5 745h7.5v0.5h-7.5zM684 745.5h8.5v0.5h-8.5zM711 745.5h7.5v0.5h-7.5zM744.5 745.5h8.5v0.5h-8.5zM684 746h9.5v0.5h-9.5zM712 746h6.5v0.5h-6.5zM744 746h9v0.5h-9zM684 746.5h10v0.5h-10zM713 746.5h5.5v0.5h-5.5zM743 746.5h10v0.5h-10zM684 747h11v0.5h-11zM713.5 747h5v0.5h-5zM742 747h11v0.5h-11zM684 747.5h12v0.5h-12zM714.5 747.5h4v0.5h-4zM741 747.5h12v0.5h-12zM684 748h13v0.5h-13zM715.5 748h3v0.5h-3zM740.5 748h12.5v0.5h-12.5zM684 748.5h13.5v0.5h-13.5zM716.5 748.5h2v0.5h-2zM739.5 748.5h13.5v0.5h-13.5zM684 749h14.5v0.5h-14.5zM717 749h1.5v0.5h-1.5zM738.5 749h14.5v0.5h-14.5zM684 749.5h15.5v0.5h-15.5zM718 749.5h0.5v0.5h-0.5zM737.5 749.5h15.5v0.5h-15.5zM684 750h16v0.5h-16zM737 750h16v0.5h-16zM684 750.5h17v0.5h-17zM736 750.5h17v0.5h-17zM684 751h18v0.5h-18zM735 751h18v0.5h-18zM684 751.5h19v0.5h-19zM734.5 751.5h18.5v0.5h-18.5zM684 752h19.5v0.5h-19.5zM733.5 752h19.5v0.5h-19.5zM684 752.5h20.5v0.5h-20.5zM732.5 752.5h20.5v0.5h-20.5zM684 753h21.5v0.5h-21.5zM731.5 753h21.5v0.5h-21.5zM684 753.5h22.5v0.5h-22.5zM731 753.5h22v0.5h-22zM684 754h23v0.5h-23zM730 754h23v0.5h-23zM684 754.5h24v0.5h-24zM729 754.5h24v0.5h-24zM684 755h25v0.5h-25zM728 755h25v0.5h-25zM685 755.5h24.5v0.5h-24.5zM727.5 755.5h25v0.5h-25zM685.5 756h25v0.5h-25zM726.5 756h25v0.5h-25zM686.5 756.5h25v0.5h-25zM725.5 756.5h25v0.5h-25zM687.5 757h25v0.5h-25zM724.5 757h25.5v0.5h-25.5zM688.5 757.5h24.5v0.5h-24.5zM724 757.5h25v0.5h-25zM689 758h25v0.5h-25zM723 758h25v0.5h-25zM690 758.5h25v0.5h-25zM722 758.5h25v0.5h-25zM691 759h25v0.5h-25zM721.5 759h25v0.5h-25zM692 759.5h24.5v0.5h-24.5zM720.5 759.5h25v0.5h-25zM692.5 760h25v0.5h-25zM719.5 760h25v0.5h-25zM693.5 760.5h50v0.5h-50zM694.5 761h48.5v0.5h-48.5zM695 761.5h47v0.5h-47zM696 762h45v0.5h-45zM697 762.5h43v0.5h-43zM698 763h41.5v0.5h-41.5zM698.5 763.5h40v0.5h-40zM699.5 764h38v0.5h-38zM700.5 764.5h36.5v0.5h-36.5zM701.5 765h34.5v0.5h-34.5zM702 765.5h33v0.5h-33zM703 766h31v0.5h-31zM704 766.5h29.5v0.5h-29.5zM704.5 767h28v0.5h-28zM705.5 767.5h26v0.5h-26zM706.5 768h24v0.5h-24zM707.5 768.5h22.5v0.5h-22.5zM708 769h21v0.5h-21zM709 769.5h19v0.5h-19zM710 770h17.5v0.5h-17.5zM711 770.5h15.5v0.5h-15.5zM711.5 771h14v0.5h-14zM712.5 771.5h12v0.5h-12zM713.5 772h10.5v0.5h-10.5zM714.5 772.5h8.5v0.5h-8.5zM715 773h7v0.5h-7zM716 773.5h5v0.5h-5zM717 774h3.5v0.5h-3.5zM717.5 774.5h2v0.5h-2z'
const P_navS = 'M179 24h1v0.5h-1zM178 24.5h3v0.5h-3zM177.5 25h4.5v0.5h-4.5zM176.5 25.5h6.5v0.5h-6.5zM175.5 26h8v0.5h-8zM174.5 26.5h10v0.5h-10zM174 27h11.5v0.5h-11.5zM173 27.5h6v0.5h-6zM180.5 27.5h6v0.5h-6zM172 28h6v0.5h-6zM181 28h6v0.5h-6zM171 28.5h6.5v0.5h-6.5zM182 28.5h6v0.5h-6zM171 29h5.5v0.5h-5.5zM183 29h5v0.5h-5zM171 29.5h4.5v0.5h-4.5zM184 29.5h4v0.5h-4zM171 30h3.5v0.5h-3.5zM184.5 30h3.5v0.5h-3.5zM171 30.5h3v0.5h-3zM179.5 30.5h1v0.5h-1zM185.5 30.5h2.5v0.5h-2.5zM171 31h2v0.5h-2zM179.5 31h2v0.5h-2zM186.5 31h1.5v0.5h-1.5zM171 31.5h1v0.5h-1zM179.5 31.5h3v0.5h-3zM187 31.5h1v0.5h-1zM171 32h1.5v0.5h-1.5zM179.5 32h3.5v0.5h-3.5zM171 32.5h2.5v0.5h-2.5zM179.5 32.5h4.5v0.5h-4.5zM171 33h3.5v0.5h-3.5zM179.5 33h5.5v0.5h-5.5zM171 33.5h4v0.5h-4zM180 33.5h6v0.5h-6zM171 34h5v0.5h-5zM180.5 34h6v0.5h-6zM171 34.5h6v0.5h-6zM181.5 34.5h6v0.5h-6zM172 35h6v0.5h-6zM182.5 35h5.5v0.5h-5.5zM172.5 35.5h6v0.5h-6zM183.5 35.5h4.5v0.5h-4.5zM173.5 36h6v0.5h-6zM184 36h4v0.5h-4zM174.5 36.5h5v0.5h-5zM185 36.5h3v0.5h-3zM175.5 37h4v0.5h-4zM186 37h2v0.5h-2zM171 37.5h0.5v0.5h-0.5zM176 37.5h3.5v0.5h-3.5zM186.5 37.5h1.5v0.5h-1.5zM171 38h1v0.5h-1zM177 38h2.5v0.5h-2.5zM187 38h1v0.5h-1zM171 38.5h2v0.5h-2zM178 38.5h1.5v0.5h-1.5zM186 38.5h2v0.5h-2zM171 39h3v0.5h-3zM179 39h0.5v0.5h-0.5zM185.5 39h2.5v0.5h-2.5zM171 39.5h3.5v0.5h-3.5zM184.5 39.5h3.5v0.5h-3.5zM171 40h4.5v0.5h-4.5zM183.5 40h4.5v0.5h-4.5zM171 40.5h5.5v0.5h-5.5zM183 40.5h5v0.5h-5zM171.5 41h6v0.5h-6zM182 41h6v0.5h-6zM172 41.5h6v0.5h-6zM181 41.5h6v0.5h-6zM173 42h6v0.5h-6zM180 42h6v0.5h-6zM174 42.5h11.5v0.5h-11.5zM175 43h9.5v0.5h-9.5zM175.5 43.5h8v0.5h-8zM176.5 44h6.5v0.5h-6.5zM177.5 44.5h4.5v0.5h-4.5zM178.5 45h2.5v0.5h-2.5zM179 45.5h1v0.5h-1z'
const P_word = 'M314 24h2.5v0.5h-2.5zM314 24.5h2.5v0.5h-2.5zM292.5 25h2v0.5h-2zM314 25h2.5v0.5h-2.5zM292 25.5h3v0.5h-3zM314 25.5h2.5v0.5h-2.5zM292 26h3v0.5h-3zM314 26h2.5v0.5h-2.5zM292 26.5h3v0.5h-3zM314 26.5h2.5v0.5h-2.5zM292 27h3v0.5h-3zM314 27h2.5v0.5h-2.5zM292 27.5h3v0.5h-3zM314 27.5h2.5v0.5h-2.5zM292 28h3v0.5h-3zM314 28h2.5v0.5h-2.5zM292 28.5h3v0.5h-3zM314 28.5h2.5v0.5h-2.5zM196 29h5.5v0.5h-5.5zM206 29h3v0.5h-3zM214.5 29h3v0.5h-3zM219.5 29h2.5v0.5h-2.5zM224 29h5v0.5h-5zM235.5 29h7v0.5h-7zM247 29h2.5v0.5h-2.5zM251.5 29h3.5v0.5h-3.5zM257 29h2.5v0.5h-2.5zM261.5 29h3v0.5h-3zM268 29h4v0.5h-4zM279 29h7v0.5h-7zM290 29h8.5v0.5h-8.5zM303 29h6v0.5h-6zM314 29h2.5v0.5h-2.5zM196 29.5h6v0.5h-6zM206 29.5h3v0.5h-3zM214.5 29.5h3v0.5h-3zM219.5 29.5h2.5v0.5h-2.5zM223.5 29.5h6v0.5h-6zM235 29.5h8v0.5h-8zM247 29.5h2.5v0.5h-2.5zM251 29.5h4v0.5h-4zM257 29.5h2.5v0.5h-2.5zM261 29.5h4v0.5h-4zM267.5 29.5h5v0.5h-5zM278.5 29.5h8v0.5h-8zM290 29.5h8.5v0.5h-8.5zM302.5 29.5h7v0.5h-7zM314 29.5h2.5v0.5h-2.5zM196 30h6.5v0.5h-6.5zM206 30h3v0.5h-3zM214.5 30h3v0.5h-3zM219.5 30h2.5v0.5h-2.5zM223 30h7v0.5h-7zM234.5 30h9v0.5h-9zM247 30h2.5v0.5h-2.5zM250.5 30h4.5v0.5h-4.5zM257 30h2.5v0.5h-2.5zM260.5 30h5v0.5h-5zM267 30h6v0.5h-6zM278 30h9v0.5h-9zM290 30h8.5v0.5h-8.5zM302 30h8v0.5h-8zM314 30h2.5v0.5h-2.5zM196 30.5h7v0.5h-7zM206 30.5h3v0.5h-3zM214.5 30.5h3v0.5h-3zM219.5 30.5h11v0.5h-11zM234 30.5h10v0.5h-10zM247 30.5h2.5v0.5h-2.5zM250 30.5h5v0.5h-5zM257 30.5h2.5v0.5h-2.5zM260 30.5h13.5v0.5h-13.5zM277.5 30.5h10v0.5h-10zM290 30.5h8.5v0.5h-8.5zM301.5 30.5h9v0.5h-9zM314 30.5h2.5v0.5h-2.5zM196 31h0.5v0.5h-0.5zM200 31h3.5v0.5h-3.5zM206 31h3v0.5h-3zM214.5 31h3v0.5h-3zM219.5 31h11.5v0.5h-11.5zM233.5 31h3.5v0.5h-3.5zM241 31h3.5v0.5h-3.5zM247 31h7.5v0.5h-7.5zM257 31h17v0.5h-17zM277 31h3.5v0.5h-3.5zM284.5 31h3.5v0.5h-3.5zM290 31h8.5v0.5h-8.5zM301 31h3.5v0.5h-3.5zM308 31h3v0.5h-3zM314 31h2.5v0.5h-2.5zM201 31.5h2.5v0.5h-2.5zM206 31.5h3v0.5h-3zM214.5 31.5h3v0.5h-3zM219.5 31.5h4.5v0.5h-4.5zM228 31.5h3v0.5h-3zM233.5 31.5h3v0.5h-3zM241.5 31.5h3v0.5h-3zM247 31.5h5v0.5h-5zM257 31.5h4.5v0.5h-4.5zM264 31.5h4v0.5h-4zM271.5 31.5h3v0.5h-3zM277 31.5h3v0.5h-3zM285 31.5h3.5v0.5h-3.5zM292 31.5h3v0.5h-3zM300.5 31.5h3v0.5h-3zM308.5 31.5h3v0.5h-3zM314 31.5h2.5v0.5h-2.5zM201 32h2.5v0.5h-2.5zM206 32h3v0.5h-3zM214.5 32h3v0.5h-3zM219.5 32h4v0.5h-4zM228.5 32h2.5v0.5h-2.5zM233.5 32h2.5v0.5h-2.5zM242 32h2.5v0.5h-2.5zM247 32h4.5v0.5h-4.5zM257 32h4v0.5h-4zM264.5 32h3v0.5h-3zM272 32h2.5v0.5h-2.5zM277 32h2.5v0.5h-2.5zM285.5 32h3v0.5h-3zM292 32h3v0.5h-3zM300.5 32h3v0.5h-3zM309 32h2.5v0.5h-2.5zM314 32h2.5v0.5h-2.5zM206 32.5h3v0.5h-3zM214.5 32.5h3v0.5h-3zM219.5 32.5h3.5v0.5h-3.5zM228.5 32.5h2.5v0.5h-2.5zM233.5 32.5h2.5v0.5h-2.5zM242 32.5h2.5v0.5h-2.5zM247 32.5h4v0.5h-4zM257 32.5h3.5v0.5h-3.5zM264.5 32.5h3v0.5h-3zM272 32.5h2.5v0.5h-2.5zM277 32.5h2.5v0.5h-2.5zM285.5 32.5h3v0.5h-3zM292 32.5h3v0.5h-3zM300.5 32.5h2.5v0.5h-2.5zM309 32.5h2.5v0.5h-2.5zM314 32.5h2.5v0.5h-2.5zM206 33h3v0.5h-3zM214.5 33h3v0.5h-3zM219.5 33h3v0.5h-3zM228.5 33h2.5v0.5h-2.5zM233.5 33h2.5v0.5h-2.5zM242 33h2.5v0.5h-2.5zM247 33h3.5v0.5h-3.5zM257 33h3v0.5h-3zM264.5 33h3v0.5h-3zM272 33h2.5v0.5h-2.5zM277 33h2.5v0.5h-2.5zM285.5 33h3v0.5h-3zM292 33h3v0.5h-3zM309 33h2.5v0.5h-2.5zM314 33h2.5v0.5h-2.5zM206 33.5h3v0.5h-3zM214.5 33.5h3v0.5h-3zM219.5 33.5h3v0.5h-3zM228.5 33.5h2.5v0.5h-2.5zM233.5 33.5h2.5v0.5h-2.5zM242 33.5h2.5v0.5h-2.5zM247 33.5h3v0.5h-3zM257 33.5h3v0.5h-3zM264.5 33.5h3v0.5h-3zM272 33.5h2.5v0.5h-2.5zM277 33.5h2.5v0.5h-2.5zM285.5 33.5h3v0.5h-3zM292 33.5h3v0.5h-3zM309 33.5h2.5v0.5h-2.5zM314 33.5h2.5v0.5h-2.5zM196 34h6v0.5h-6zM206 34h3v0.5h-3zM214.5 34h3v0.5h-3zM219.5 34h3v0.5h-3zM228.5 34h2.5v0.5h-2.5zM233.5 34h11v0.5h-11zM247 34h3v0.5h-3zM257 34h2.5v0.5h-2.5zM264.5 34h3v0.5h-3zM272 34h2.5v0.5h-2.5zM277 34h11.5v0.5h-11.5zM292 34h3v0.5h-3zM302.5 34h9v0.5h-9zM314 34h2.5v0.5h-2.5zM196 34.5h6.5v0.5h-6.5zM206 34.5h3v0.5h-3zM214.5 34.5h3v0.5h-3zM219.5 34.5h3v0.5h-3zM228.5 34.5h2.5v0.5h-2.5zM233.5 34.5h11v0.5h-11zM247 34.5h3v0.5h-3zM257 34.5h2.5v0.5h-2.5zM264.5 34.5h3v0.5h-3zM272 34.5h2.5v0.5h-2.5zM277 34.5h11.5v0.5h-11.5zM292 34.5h3v0.5h-3zM302 34.5h9.5v0.5h-9.5zM314 34.5h2.5v0.5h-2.5zM196 35h7v0.5h-7zM206 35h3v0.5h-3zM214.5 35h3v0.5h-3zM219.5 35h3v0.5h-3zM228.5 35h2.5v0.5h-2.5zM233.5 35h11v0.5h-11zM247 35h3v0.5h-3zM257 35h2.5v0.5h-2.5zM264.5 35h3v0.5h-3zM272 35h2.5v0.5h-2.5zM277 35h11.5v0.5h-11.5zM292 35h3v0.5h-3zM301.5 35h10v0.5h-10zM314 35h2.5v0.5h-2.5zM196 35.5h7.5v0.5h-7.5zM206 35.5h3v0.5h-3zM214.5 35.5h3v0.5h-3zM219.5 35.5h3v0.5h-3zM228.5 35.5h2.5v0.5h-2.5zM233.5 35.5h11v0.5h-11zM247 35.5h3v0.5h-3zM257 35.5h2.5v0.5h-2.5zM264.5 35.5h3v0.5h-3zM272 35.5h2.5v0.5h-2.5zM277 35.5h11v0.5h-11zM292 35.5h3v0.5h-3zM301 35.5h10.5v0.5h-10.5zM314 35.5h2.5v0.5h-2.5zM200.5 36h3.5v0.5h-3.5zM206 36h3v0.5h-3zM214.5 36h3v0.5h-3zM219.5 36h3v0.5h-3zM228.5 36h2.5v0.5h-2.5zM233.5 36h2.5v0.5h-2.5zM247 36h3v0.5h-3zM257 36h2.5v0.5h-2.5zM264.5 36h3v0.5h-3zM272 36h2.5v0.5h-2.5zM277 36h2.5v0.5h-2.5zM292 36h3v0.5h-3zM300.5 36h3v0.5h-3zM309 36h2.5v0.5h-2.5zM314 36h2.5v0.5h-2.5zM201 36.5h3v0.5h-3zM206 36.5h3v0.5h-3zM214 36.5h3.5v0.5h-3.5zM219.5 36.5h3v0.5h-3zM228.5 36.5h2.5v0.5h-2.5zM233.5 36.5h2.5v0.5h-2.5zM247 36.5h3v0.5h-3zM257 36.5h2.5v0.5h-2.5zM264.5 36.5h3v0.5h-3zM272 36.5h2.5v0.5h-2.5zM277 36.5h2.5v0.5h-2.5zM292 36.5h3v0.5h-3zM300.5 36.5h2.5v0.5h-2.5zM309 36.5h2.5v0.5h-2.5zM314 36.5h2.5v0.5h-2.5zM201 37h3v0.5h-3zM206 37h3v0.5h-3zM213.5 37h4v0.5h-4zM219.5 37h3v0.5h-3zM228.5 37h2.5v0.5h-2.5zM233.5 37h2.5v0.5h-2.5zM247 37h3v0.5h-3zM257 37h2.5v0.5h-2.5zM264.5 37h3v0.5h-3zM272 37h2.5v0.5h-2.5zM277 37h2.5v0.5h-2.5zM292 37h3v0.5h-3zM300.5 37h2.5v0.5h-2.5zM308.5 37h3v0.5h-3zM314 37h2.5v0.5h-2.5zM201 37.5h3v0.5h-3zM206 37.5h3v0.5h-3zM213 37.5h4.5v0.5h-4.5zM219.5 37.5h4v0.5h-4zM228.5 37.5h2.5v0.5h-2.5zM233.5 37.5h2.5v0.5h-2.5zM242 37.5h2.5v0.5h-2.5zM247 37.5h3v0.5h-3zM257 37.5h2.5v0.5h-2.5zM264.5 37.5h3v0.5h-3zM272 37.5h2.5v0.5h-2.5zM277 37.5h2.5v0.5h-2.5zM285.5 37.5h2.5v0.5h-2.5zM292 37.5h3v0.5h-3zM300.5 37.5h2.5v0.5h-2.5zM308 37.5h3.5v0.5h-3.5zM314 37.5h2.5v0.5h-2.5zM201 38h3v0.5h-3zM206 38h3.5v0.5h-3.5zM212.5 38h5v0.5h-5zM219.5 38h4.5v0.5h-4.5zM228 38h3v0.5h-3zM233.5 38h3v0.5h-3zM242 38h2.5v0.5h-2.5zM247 38h3v0.5h-3zM257 38h2.5v0.5h-2.5zM264.5 38h3v0.5h-3zM272 38h2.5v0.5h-2.5zM277 38h3v0.5h-3zM285.5 38h2.5v0.5h-2.5zM292 38h3v0.5h-3zM300.5 38h2.5v0.5h-2.5zM307.5 38h4v0.5h-4zM314 38h2.5v0.5h-2.5zM200.5 38.5h3v0.5h-3zM206.5 38.5h3.5v0.5h-3.5zM212 38.5h5.5v0.5h-5.5zM219.5 38.5h5v0.5h-5zM227.5 38.5h3.5v0.5h-3.5zM233.5 38.5h3.5v0.5h-3.5zM241.5 38.5h3v0.5h-3zM247 38.5h3v0.5h-3zM257 38.5h2.5v0.5h-2.5zM264.5 38.5h3v0.5h-3zM272 38.5h2.5v0.5h-2.5zM277 38.5h3.5v0.5h-3.5zM285 38.5h3v0.5h-3zM292.5 38.5h3.5v0.5h-3.5zM300.5 38.5h3v0.5h-3zM307 38.5h4.5v0.5h-4.5zM314 38.5h2.5v0.5h-2.5zM196 39h7.5v0.5h-7.5zM207 39h7.5v0.5h-7.5zM215 39h2.5v0.5h-2.5zM219.5 39h11v0.5h-11zM234 39h10v0.5h-10zM247 39h3v0.5h-3zM257 39h2.5v0.5h-2.5zM264.5 39h3v0.5h-3zM272 39h2.5v0.5h-2.5zM277.5 39h10v0.5h-10zM293 39h5.5v0.5h-5.5zM301 39h10.5v0.5h-10.5zM314 39h2.5v0.5h-2.5zM196 39.5h7v0.5h-7zM207.5 39.5h6.5v0.5h-6.5zM215 39.5h2.5v0.5h-2.5zM219.5 39.5h10.5v0.5h-10.5zM234.5 39.5h9v0.5h-9zM247 39.5h3v0.5h-3zM257 39.5h2.5v0.5h-2.5zM264.5 39.5h3v0.5h-3zM272 39.5h2.5v0.5h-2.5zM278 39.5h9v0.5h-9zM293.5 39.5h5v0.5h-5zM301.5 39.5h7v0.5h-7zM309 39.5h2.5v0.5h-2.5zM314 39.5h2.5v0.5h-2.5zM196 40h6.5v0.5h-6.5zM208 40h5.5v0.5h-5.5zM215 40h2.5v0.5h-2.5zM219.5 40h3v0.5h-3zM223.5 40h6v0.5h-6zM235 40h8v0.5h-8zM247 40h3v0.5h-3zM257 40h2.5v0.5h-2.5zM264.5 40h3v0.5h-3zM272 40h2.5v0.5h-2.5zM278.5 40h8v0.5h-8zM294 40h4.5v0.5h-4.5zM302 40h6v0.5h-6zM309 40h2.5v0.5h-2.5zM314 40h2.5v0.5h-2.5zM196 40.5h6v0.5h-6zM208.5 40.5h4.5v0.5h-4.5zM215 40.5h2.5v0.5h-2.5zM219.5 40.5h3v0.5h-3zM224 40.5h5v0.5h-5zM235.5 40.5h7v0.5h-7zM247 40.5h3v0.5h-3zM257 40.5h2.5v0.5h-2.5zM264.5 40.5h3v0.5h-3zM272 40.5h2.5v0.5h-2.5zM279 40.5h7v0.5h-7zM294.5 40.5h4v0.5h-4zM302.5 40.5h5v0.5h-5zM309 40.5h2.5v0.5h-2.5zM314 40.5h2.5v0.5h-2.5zM219.5 41h3v0.5h-3zM219.5 41.5h3v0.5h-3zM219.5 42h3v0.5h-3zM219.5 42.5h3v0.5h-3zM219.5 43h3v0.5h-3zM219.5 43.5h3v0.5h-3zM219.5 44h3v0.5h-3zM219.5 44.5h3v0.5h-3zM219.5 45h3v0.5h-3zM219.5 45.5h3v0.5h-3z'
const P_rust = 'M600 447h0.5v0.5h-0.5zM601.5 447h1v0.5h-1zM600 447.5h1v0.5h-1zM601.5 447.5h1v0.5h-1zM603 447.5h1v0.5h-1zM605 447.5h0.5v0.5h-0.5zM598.5 448h7v0.5h-7zM597.5 448.5h9v0.5h-9zM597.5 449h2v0.5h-2zM601.5 449h1v0.5h-1zM604.5 449h2v0.5h-2zM596 449.5h2.5v0.5h-2.5zM605.5 449.5h2.5v0.5h-2.5zM596.5 450h1.5v0.5h-1.5zM606 450h1.5v0.5h-1.5zM595 450.5h2.5v0.5h-2.5zM606.5 450.5h2.5v0.5h-2.5zM595.5 451h9.5v0.5h-9.5zM607 451h1.5v0.5h-1.5zM595.5 451.5h10v0.5h-10zM607.5 451.5h1v0.5h-1zM594.5 452h11.5v0.5h-11.5zM607.5 452h2v0.5h-2zM595 452.5h11v0.5h-11zM607.5 452.5h1.5v0.5h-1.5zM594.5 453h2.5v0.5h-2.5zM598 453h2.5v0.5h-2.5zM603.5 453h2.5v0.5h-2.5zM607 453h2.5v0.5h-2.5zM594 453.5h2.5v0.5h-2.5zM598 453.5h2.5v0.5h-2.5zM603.5 453.5h2.5v0.5h-2.5zM607.5 453.5h2.5v0.5h-2.5zM594.5 454h1v0.5h-1zM598 454h8v0.5h-8zM608.5 454h1v0.5h-1zM594.5 454.5h1v0.5h-1zM598 454.5h7.5v0.5h-7.5zM608.5 454.5h1v0.5h-1zM594 455h1.5v0.5h-1.5zM598 455h7.5v0.5h-7.5zM608.5 455h1.5v0.5h-1.5zM594.5 455.5h1v0.5h-1zM598 455.5h7.5v0.5h-7.5zM607.5 455.5h2v0.5h-2zM594.5 456h1v0.5h-1zM598 456h2.5v0.5h-2.5zM603 456h3v0.5h-3zM607.5 456h2v0.5h-2zM594 456.5h1.5v0.5h-1.5zM598 456.5h2.5v0.5h-2.5zM603.5 456.5h2.5v0.5h-2.5zM607.5 456.5h2.5v0.5h-2.5zM595 457h7v0.5h-7zM603.5 457h5.5v0.5h-5.5zM594.5 457.5h7.5v0.5h-7.5zM603.5 457.5h6v0.5h-6zM594.5 458h7.5v0.5h-7.5zM604 458h5.5v0.5h-5.5zM595.5 458.5h6.5v0.5h-6.5zM604.5 458.5h4v0.5h-4zM595.5 459h1.5v0.5h-1.5zM607 459h1.5v0.5h-1.5zM595 459.5h4v0.5h-4zM605 459.5h4v0.5h-4zM596.5 460h2.5v0.5h-2.5zM605 460h2.5v0.5h-2.5zM596 460.5h3v0.5h-3zM605 460.5h3v0.5h-3zM597.5 461h2.5v0.5h-2.5zM604.5 461h2v0.5h-2zM597.5 461.5h0.5v0.5h-0.5zM598.5 461.5h7v0.5h-7zM606 461.5h0.5v0.5h-0.5zM598.5 462h7v0.5h-7zM600 462.5h1v0.5h-1zM601.5 462.5h1v0.5h-1zM603 462.5h1v0.5h-1z'
const abs = (x: number, y: number, s: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left: x, top: y, ...s })

// tiles: [x, y, mirrored, rank]  rank = landing order on the core face (0 = top)
const TILES: [number, number, boolean, number, string][] = [
  [235, 470, false, 0, 'mysql'], [302, 522.5, false, 1, 'pg'], [235, 589, false, 2, 'sf'], [302, 637, false, 3, 'oracle'],
  [235, 685, false, 4, 'gcp'], [302, 733, false, 5, 'mssql'], [235, 799, false, 6, 'intercom'], [302, 850, false, 7, 'mongo'],
  [1149, 470, true, 0, 'click'], [1082, 522.5, true, 1, 'redshift'], [1149, 589, true, 2, 'bq'], [1082, 637, true, 3, 'snow'],
  [1149, 685, true, 4, 's3'], [1082, 733, true, 5, 'n'], [1149, 799, true, 6, 'kafka'], [1082, 850, true, 7, 'gray'],
]
// node x (left edge) per tile, measured on the left side; the right side mirrors about x = 720
const NODE: Record<string, number> = { mysql: 473.5, pg: 419.5, sf: 338.5, oracle: 456.5, gcp: 427.5, mssql: 371.5, intercom: 444.5, mongo: 391.5 }
const MIRROR: Record<string, string> = { click: 'mysql', redshift: 'pg', bq: 'sf', snow: 'oracle', s3: 'gcp', n: 'mssql', kafka: 'intercom', gray: 'mongo' }

function tilePath(x: number, y: number, m: boolean) {
  const w = 56, h = 66, a = 16, b = 10
  return m
    ? `M${x} ${y}H${x + w - a}L${x + w} ${y + a}V${y + h}H${x + b}L${x} ${y + h - b}Z`
    : `M${x + a} ${y}H${x + w}V${y + h - b}L${x + w - b} ${y + h}H${x}V${y + a}Z`
}

// one connector: tile edge -> node -> bend -> core face
function wire(x: number, y: number, m: boolean, rank: number, key: string) {
  const cy = y + 33, sx = m ? x : x + 56
  const nx = m ? 1440 - (NODE[MIRROR[key]] + 7) : NODE[key]
  const bendX = m ? 1440 - 494 : 494, fx = m ? 809 : 629, fy = 634 + 22 * rank
  const dir = m ? -1 : 1, r = 12
  const dx = fx - bendX, dy = fy - cy, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len
  const p = `M${sx} ${cy}H${bendX - dir * r}Q${bendX} ${cy} ${bendX + ux * r} ${cy + uy * r}L${fx} ${fy}`
  const n0 = m ? nx + 7 : nx
  const dash = `M${n0 - dir * 24} ${cy}H${n0}`
  return (
    <g key={key}>
      <path d={p} fill="none" stroke="#2a2a2a" strokeWidth={1} />
      <defs>
        <linearGradient id={`lg-${key}`} x1={n0 - dir * 24} x2={n0} y1={0} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ea580c" stopOpacity="0.1" /><stop offset="1" stopColor="#ea580c" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <path d={dash} stroke={`url(#lg-${key})`} strokeWidth={1} strokeDasharray="2.5 1.5" />
      <rect x={nx + 0.5} y={cy - 3} width={6} height={6} fill="#000" stroke="#4b4743" strokeWidth={1} />
    </g>
  )
}

// flat stand-ins for third-party marks (not registered by design)
function Mark({ k, cx, cy }: { k: string; cx: number; cy: number }) {
  const T = (t: string, c: string, s = 9, w = 700) => <text x={cx} y={cy + s * 0.35} fill={c} fontSize={s} fontWeight={w} textAnchor="middle" fontFamily="Arial">{t}</text>
  switch (k) {
    case 'mysql': return T('MySQL', '#00758f', 10)
    case 'pg': return <ellipse cx={cx} cy={cy} rx={13} ry={15} fill="#336791" />
    case 'sf': return <g><ellipse cx={cx} cy={cy} rx={17} ry={11} fill="#00a1e0" />{T('salesforce', '#fff', 6, 400)}</g>
    case 'oracle': return <rect x={cx - 14} y={cy - 8} width={28} height={16} rx={8} fill="none" stroke="#c74634" strokeWidth={3.5} />
    case 'gcp': return <g><path d={`M${cx - 18} ${cy - 15}l6 -6h10l6 6l-6 6h-10z`} fill="#4285f4" /><rect x={cx - 7} y={cy + 3} width={10} height={12} fill="#e25444" /></g>
    case 'mssql': return T('SQL', '#cc2927', 7)
    case 'intercom': return <rect x={cx - 15} y={cy - 15} width={30} height={30} rx={6} fill="#1f8ded" />
    case 'mongo': return <ellipse cx={cx} cy={cy} rx={5} ry={13} fill="#47a248" />
    case 'click': return <rect x={cx - 16} y={cy - 16} width={32} height={32} fill="#faff69" />
    case 'redshift': return <rect x={cx - 14} y={cy - 16} width={28} height={32} rx={4} fill="#2e73b8" />
    case 'bq': return <path d={`M${cx - 15} ${cy}l7.5 -13h15l7.5 13l-7.5 13h-15z`} fill="#4285f4" />
    case 'snow': return <circle cx={cx} cy={cy} r={13} fill="none" stroke="#29b5e8" strokeWidth={3} />
    case 's3': return <rect x={cx - 13} y={cy - 16} width={26} height={32} fill="#e05243" />
    case 'n': return <path d={`M${cx - 15} ${cy + 13}V${cy - 13}L${cx + 15} ${cy + 13}V${cy - 13}`} fill="none" stroke="#5a2d8c" strokeWidth={6} />
    case 'kafka': return <g fill="none" stroke="#555" strokeWidth={2}><circle cx={cx} cy={cy - 12} r={4} /><circle cx={cx} cy={cy} r={5} /><circle cx={cx} cy={cy + 12} r={4} /><circle cx={cx + 10} cy={cy - 6} r={3} /><circle cx={cx + 10} cy={cy + 6} r={3} /></g>
    default: return null
  }
}

export default function KargulHeroC() {
  const stripes: string[] = []
  for (let x0 = -220; x0 < 140; x0 += 9.25) stripes.push(`M${x0} 73L${x0 + 0.2 * (H - 73)} ${H}`)
  for (let x0 = 1300 - 220; x0 < 1440; x0 += 9.25) stripes.push(`M${x0} 73L${x0 + 0.2 * (H - 73)} ${H}`)
  const floorX = [165.5, 271.5, 374.5, 475, 573, 670.5, 768, 865.5, 964, 1064, 1167, 1273]
  const VP = { x: 720, y: 25 }
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: '#111111', fontFamily: FONT, color: '#fff' }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600&display=block" />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} aria-hidden>
        <defs>
          <clipPath id="sides"><rect x={0} y={73} width={139.5} height={H} /><rect x={1301} y={73} width={139} height={H} /></clipPath>
          <clipPath id="stage"><rect x={140} y={600} width={1160} height={386.5} /></clipPath>
          <radialGradient id="glow" cx="720" cy="760" r="300" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 760) scale(1 0.42) translate(0 -760)">
            <stop offset="0" stopColor="#ea580c" stopOpacity="0.28" /><stop offset="0.45" stopColor="#ea580c" stopOpacity="0.08" /><stop offset="1" stopColor="#ea580c" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="shadow"><stop offset="0" stopColor="#000" stopOpacity="0.85" /><stop offset="0.6" stopColor="#000" stopOpacity="0.35" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
          <pattern id="dots" x={629} y={645} width={6} height={12} patternUnits="userSpaceOnUse"><rect x={4} y={4} width={1} height={1} fill="#262626" /></pattern>
        </defs>
        <g clipPath="url(#sides)"><path d={stripes.join('')} stroke="#1b1b1b" strokeWidth={1} /></g>
        <rect x={0} y={72} width={W} height={1} fill="#1b1b1b" />
        <rect x={139} y={73} width={1} height={H} fill="#1b1b1b" />
        <rect x={1300} y={73} width={1} height={H} fill="#1d1d1d" />
        {/* floor */}
        <rect x={140} y={640} width={1160} height={346} fill="url(#glow)" />
        <g clipPath="url(#stage)" stroke="#1a1a1a" strokeWidth={1}>
          {floorX.map((x) => { const t = (986 - VP.y) / (980 - VP.y); const xb = VP.x + (x - VP.x) * t; return <line key={x} x1={VP.x + (x - VP.x) * ((600 - VP.y) / (980 - VP.y))} y1={600} x2={xb} y2={986} /> })}
          {[743, 794, 851, 915].map((y) => <line key={y} x1={140} x2={1300} y1={y + 0.5} y2={y + 0.5} />)}
        </g>
        <rect x={140} y={985.5} width={1160} height={1} fill="#2b1910" />
        <rect x={140} y={986.5} width={1160} height={H} fill="#101010" />
        {TILES.map(([x, y, m, rk, k]) => wire(x, y, m, rk, k))}
        {TILES.map(([x, y, m, , k]) => (
          <g key={k}><path d={tilePath(x + 0.5, y + 0.5, m)} transform="" fill="#000" stroke="#2f2c2a" strokeWidth={1} />
            <Mark k={k} cx={x + 28} cy={y + 33} /></g>
        ))}
        {/* core */}
        <ellipse cx={720} cy={840} rx={150} ry={48} fill="url(#shadow)" />
        <path d="M633 618.5H805L809 644.5H629Z" fill="#000" stroke="#2f2c2a" strokeWidth={1} />
        <rect x={629.5} y={645} width={179} height={178} fill="#000" stroke="#242221" strokeWidth={1} />
        <rect x={631} y={647} width={176} height={174} fill="url(#dots)" />
        <path d={P_S} fill="#ea580c" />
        {/* nav marks */}
        <path d={P_navS} fill="#ea580c" />
        <path d={P_word} fill="#ffffff" />
        <path d={P_rust} fill="#ea580c" />
      </svg>

      {/* nav */}
      {[['Product', 341.5], ['How it works', 413.5], ['Features', 515.5], ['Pricing', 593.5], ['FAQs', 659.5]].map(([t, x]) => (
        <div key={t as string} style={abs((x as number) - 1, 25.5, { fontSize: 15, fontWeight: 400, color: '#a0a0a0', lineHeight: '20px', whiteSpace: 'nowrap' })}>{t}</div>
      ))}
      <div style={abs(981.5, 24.5, { fontSize: 14.25, fontWeight: 500, lineHeight: '20px', whiteSpace: 'nowrap' })}>Explore the docs</div>
      <div style={abs(1111.5, 16, { width: 157.5, height: 37.5, background: '#1d1d1d', boxShadow: 'inset 0 0 0 1px #222222' })} />
      <div style={abs(1131, 24, { fontSize: 14.25, fontWeight: 500, lineHeight: '20px', whiteSpace: 'nowrap' })}>Book a Free Demo</div>

      {/* copy */}
      <h1 style={{ margin: 0, position: 'absolute', left: -1, top: 129, width: W, textAlign: 'center', fontSize: 64, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: '60px' }}>
        Sync Data at The<br />Speed of Light
      </h1>
      <p style={{ margin: 0, position: 'absolute', left: 0, top: 268, width: W, textAlign: 'center', fontSize: 17, fontWeight: 500, lineHeight: '22px', color: '#a0a0a0' }}>
        Supermetal is a low footprint real time data integration platform<br />that provides unparalleled compute economics, reliability and<br />security all within your infra (cloud, hybrid and on-prem)”
      </p>
      <a href="#/kheroc" style={abs(539, 372, { width: 180, height: 51, background: '#ee793d', clipPath: 'polygon(0 0, 161px 0, 180px 19px, 180px 51px, 19px 51px, 0 32px)', textDecoration: 'none' })}>
        <span style={{ position: 'absolute', inset: 1, background: '#ea580c', clipPath: 'polygon(0 0, 159.6px 0, 178px 18.4px, 178px 49px, 18.4px 49px, 0 30.6px)' }} />
        <span style={{ position: 'absolute', left: 21.5, top: 14, fontSize: 16, fontWeight: 500, letterSpacing: '0.16px', color: '#fff', lineHeight: '24px', whiteSpace: 'nowrap' }}>Book a Free Demo</span>
      </a>
      <a href="#/kheroc" style={abs(734, 372, { width: 167, height: 51, background: '#1d1d1d', boxShadow: 'inset 0 0 0 1px #282828', textDecoration: 'none' })}>
        <span style={{ position: 'absolute', left: 20, top: 14, fontSize: 16, fontWeight: 500, letterSpacing: '0.13px', color: '#fff', lineHeight: '24px', whiteSpace: 'nowrap' }}>Explore the docs</span>
      </a>
      <div style={abs(614, 443.5, { fontSize: 16, letterSpacing: '0.18px', fontWeight: 500, lineHeight: '22px', whiteSpace: 'nowrap' })}>Built in Rust and Apache Arrow</div>
    </div>
  )
}

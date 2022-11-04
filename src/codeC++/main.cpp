// Auteur : Titouan Cocheril
// Date : 12/10/2022
/*------------------------------------------------------------------------------------------------------*/

#include "opencv2/imgproc.hpp"
#include "opencv2/imgcodecs.hpp"
#include "opencv2/highgui.hpp"
#include <iostream>
using namespace cv;
using std::cout;
#include <vector>
#include <list>
#include <utility> 
#include <cstdlib>


cv::Mat src, src_gray, src_blur, src_canny, src_dil;
std::vector<int> listeHauteurBarre(String);


int main( int argc, char** argv )
{
    std::vector<int> a =listeHauteurBarre("/Users/titoucoch/Desktop/ProjectOpenCV/imageST.png");
}



std::vector<int> listeHauteurBarre(String path) 
{ 
        //Chargement de l'image 
    String imageName(path);
    cv::Mat src = cv::imread(imageName);

    //Modification des couleurs et forme des objets de l'image

    cvtColor( src, src_gray, COLOR_BGR2GRAY ); // Convertion en gris
    GaussianBlur(src_gray, src_blur, Size(3, 3), 3, 0); //Application d'un flou
    Canny(src_gray, src_canny, 25, 75); //Detection des bordures des objets dans l'image
    cv::Mat kernel = getStructuringElement(MORPH_RECT, Size(3,3)); //Rognage des bordure pour augmenter la précision des points 
    dilate(src_canny, src_dil, kernel); //Dilatation des objets

    
    std::vector<std::vector<Point>> contours; //Tableau de tableau de points (matrice)
    std::vector<Vec4i> hierarchy;  
    cv::findContours(src_dil, contours, hierarchy, cv::RETR_EXTERNAL, cv::CHAIN_APPROX_NONE);   //Fonction qui récupère dans une matrice le contours des objets de l'image

    typedef std::pair<int, int> pair; 
    std::vector<pair> result;   //Tableau de paire (x,y)
    //Parcour des objets via la matrice
    for(int i= 0; i < contours.size(); i++)
    {
        int tempYinitial=contours[i][0].y;  //Coordonnée y la plus haute de l'objet
        int tempXinitial=contours[i][0].x;  //Coordonnée x la plus haute de l'objet
        int tempYsecond=0;
        //Recherche de la coordonnée y la plus basse dans la matrice pour cette objet
        for(int j= 1; j < contours[i].size();j++) 
        {
            if(contours[i][j].y>tempYsecond){
                tempYsecond=contours[i][j].y; //Coordonnée y la basse de l'objet
            }     
        }
        int diff=tempYsecond-tempYinitial; //Hauteur de l'objet (différence entre max et min)
        std::pair<int,int> mapaire; //Instance d'une pair de int
        mapaire.first =tempXinitial;    //Récupération du X de l'objet
        mapaire.second = diff;  //Différence entre le Y max et le Y min de l'objet
        result.push_back(mapaire);  //Ajout dans la liste result
    }

    //Trie des coordonnées des objets par leurs valeurs de X
    std::sort(result.begin(), result.end(),
            [](const pair &x, const pair &y) {
                // compare la seconde valeur
                if (x.first != y.first) {
                    return x.first < y.first;
                }
                // comparer d'abord uniquement si la seconde valeur est égale
                return x.second < y.second;
            });
    
    std::vector<int> listeHauteur; //Création d'une liste d'entier qui recevra les hauteurs de barres

    double ratio = result[0].second/result[1].second; //Calcule du ratio (Logo divisé par la première barre la plus petite)
    //Boucle qui parcour les hauteurs des objets de la liste result pour les diviser par le ratio et l'ajouter à la liste listeHauteur
    for(int i=1 ; i<result.size(); i++)
    {
        double temp = result[i].second/ratio;
        listeHauteur.push_back(temp);
    }
    
    for(int i=0 ; i<listeHauteur.size(); i++)
    {
        cout<<listeHauteur[i]<<std::endl;
    }
    return listeHauteur; 
} 



